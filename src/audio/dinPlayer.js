// src/audio/dinPlayer.js

// src/audio/dinPlayer.js

function dbToGain(db) {
    return Math.pow(10, db / 20);
}

export class DinPlayer {
    constructor({
        locale = 'pt-BR',
        basePath = '/audio',
        gapMs = 350,

        // níveis default (ajuste depois)
        noiseDb = -20, // ruído base
        snrDb = 0, // fala - ruído

        // suavização (ms) ao mudar níveis
        rampMs = 20
    } = {}) {
        this.locale = locale;
        this.basePath = basePath;
        this.gapMs = gapMs;

        this.ctx = null;
        this.noiseBuffer = null;
        this.digitBuffers = new Map();

        this.noiseSource = null;
        this.noiseGain = null;

        // defaults de nível
        this.noiseDb = noiseDb;
        this.snrDb = snrDb;
        this.rampMs = rampMs;
    }

    async init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') await this.ctx.resume();

        this.noiseBuffer = await this._loadWav(`${this.basePath}/${this.locale}/noise/background.wav`);

        const digits = Array.from({ length: 10 }, (_, i) => String(i));
        await Promise.all(
            digits.map(async (d) => {
                const buf = await this._loadWav(`${this.basePath}/${this.locale}/digits/${d}.wav`);
                this.digitBuffers.set(d, buf);
            })
        );
    }

    /**
     * Define níveis em dB.
     * - noiseDb: nível base do ruído
     * - snrDb: fala - ruído
     *
     * Ex:
     * noiseDb=-20 e snrDb=-6 => voiceDb=-26 (fala mais baixa que ruído)
     */
    setLevels({ noiseDb, snrDb } = {}) {
        if (typeof noiseDb === 'number') this.noiseDb = noiseDb;
        if (typeof snrDb === 'number') this.snrDb = snrDb;

        // se o ruído já estiver tocando, atualiza o gain ao vivo
        if (this.noiseGain && this.ctx) {
            this._setGainSmooth(this.noiseGain.gain, dbToGain(this.noiseDb));
        }
    }

    startNoise() {
        if (!this.ctx) throw new Error('AudioContext not initialized. Call init() first.');
        if (!this.noiseBuffer) throw new Error('Noise buffer not loaded. Call init() first.');

        this.stopNoise();

        this.noiseGain = this.ctx.createGain();
        this.noiseGain.gain.value = dbToGain(this.noiseDb);

        this.noiseSource = this.ctx.createBufferSource();
        this.noiseSource.buffer = this.noiseBuffer;
        this.noiseSource.loop = true;

        this.noiseSource.connect(this.noiseGain);
        this.noiseGain.connect(this.ctx.destination);

        this.noiseSource.start();
    }

    stopNoise() {
        if (this.noiseSource) {
            try {
                this.noiseSource.stop();
            } catch {}
            try {
                this.noiseSource.disconnect();
            } catch {}
            this.noiseSource = null;
        }
        if (this.noiseGain) {
            try {
                this.noiseGain.disconnect();
            } catch {}
            this.noiseGain = null;
        }
    }

    /**
     * Toca a sequência de dígitos aplicando o SNR atual (this.snrDb).
     * Você pode sobrescrever snrDb por chamada: playDigitsSequence(seq, { snrDb })
     */
    async playDigitsSequence(seq, { snrDb } = {}) {
        if (!this.ctx) throw new Error('AudioContext not initialized. Call init() first.');

        const effectiveSnrDb = typeof snrDb === 'number' ? snrDb : this.snrDb;
        const voiceDb = this.noiseDb + effectiveSnrDb;
        const voiceGainValue = dbToGain(voiceDb);

        let t = this.ctx.currentTime;

        for (const d of seq) {
            const buf = this.digitBuffers.get(String(d));
            if (!buf) throw new Error(`Digit buffer not found: ${d}`);

            const src = this.ctx.createBufferSource();
            src.buffer = buf;

            const gain = this.ctx.createGain();
            // inicia no ganho correto (pode também ramp)
            gain.gain.value = voiceGainValue;

            src.connect(gain);
            gain.connect(this.ctx.destination);

            src.start(t);

            t += buf.duration + this.gapMs / 1000;

            src.onended = () => {
                try {
                    src.disconnect();
                } catch {}
                try {
                    gain.disconnect();
                } catch {}
            };
        }
    }

    generateTriplet() {
        const pool = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const pick = () => pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        return [pick(), pick(), pick()];
    }

    async _loadWav(url) {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Failed to fetch ${url} (${resp.status})`);
        const arr = await resp.arrayBuffer();
        return await this.ctx.decodeAudioData(arr);
    }

    _setGainSmooth(audioParam, targetGain) {
        const now = this.ctx.currentTime;
        const rampSec = Math.max(0.001, this.rampMs / 1000);

        // evita clicks: vai do valor atual até o alvo suavemente
        try {
            audioParam.cancelScheduledValues(now);
            audioParam.setValueAtTime(audioParam.value, now);
            audioParam.linearRampToValueAtTime(targetGain, now + rampSec);
        } catch {
            // fallback simples
            audioParam.value = targetGain;
        }
    }

    dispose() {
        this.stopNoise();
        if (this.ctx) {
            this.ctx.close();
            this.ctx = null;
        }
    }
}

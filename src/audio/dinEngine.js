// src/audio/dinEngine.js

/**
 * DIN Staircase Engine (MVP)
 * - 1-up/1-down adaptive procedure
 * - Track reversals (direction changes)
 * - Estimate SRT in dB SNR
 *
 * Observação:
 * - "snrDb" é o alvo de dificuldade. Quanto mais baixo (mais negativo), mais difícil.
 * - Você mantém o ruído num nível base e ajusta a fala para ter o SNR desejado.
 */

export function clamp(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

export function nowIso() {
    return new Date().toISOString();
}

/**
 * Classificação simples (ajustável depois com calibração e amostra real).
 * Regra geral: quanto mais NEGATIVO o SRT, melhor.
 */
export function classifySrt(srtDb, thresholds = { goodMax: -8, watchMax: -5 }) {
    if (srtDb <= thresholds.goodMax) return { label: 'Boa', level: 'good' };
    if (srtDb <= thresholds.watchMax) return { label: 'Atenção', level: 'watch' };
    return { label: 'Provável perda', level: 'poor' };
}

export class DinStaircaseEngine {
    constructor({
        locale = 'pt-BR',
        // ponto de partida
        startSnrDb = 0,
        // limites de SNR para não sair do controle
        minSnrDb = -16,
        maxSnrDb = +10,

        // steps
        initialStepDb = 6,
        finalStepDb = 2,
        // após quantos reversals reduzir o step
        reduceStepAfterReversals = 4,

        // critérios de parada
        maxTrials = 25,
        targetReversals = 10,

        // cálculo do SRT
        // "reversals": média dos últimos N reversals
        // "lastN": média dos últimos N trials
        srtMethod = 'reversals',
        srtReversalsN = 6,
        srtLastN = 10
    } = {}) {
        this.config = {
            locale,
            startSnrDb,
            minSnrDb,
            maxSnrDb,
            initialStepDb,
            finalStepDb,
            reduceStepAfterReversals,
            maxTrials,
            targetReversals,
            srtMethod,
            srtReversalsN,
            srtLastN
        };

        this.reset();
    }

    reset() {
        const c = this.config;

        this.state = {
            locale: c.locale,
            trialIndex: 0,

            snrDb: c.startSnrDb,
            stepDb: c.initialStepDb,

            // direção do ajuste após o último trial:
            // "down" = ficou mais difícil (SNR diminuiu)
            // "up"   = ficou mais fácil (SNR aumentou)
            lastDirection: null,

            reversals: [], // { trialIndex, snrDb, at, directionFrom, directionTo }
            trials: [], // { trialIndex, snrDb, correct, seq, userAnswer, at }

            finished: false,
            finishedReason: null
        };
    }

    /**
     * Gera um triplet (sem repetição no mesmo estímulo).
     */
    generateTriplet() {
        const pool = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const pick = () => pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        return [pick(), pick(), pick()];
    }

    /**
     * Retorna parâmetros atuais do trial:
     * - snrDb atual
     * - stepDb atual
     * - trialIndex atual (próximo)
     */
    getCurrentTrialParams() {
        const s = this.state;
        return {
            trialIndex: s.trialIndex,
            snrDb: s.snrDb,
            stepDb: s.stepDb,
            reversalsCount: s.reversals.length,
            finished: s.finished
        };
    }

    /**
     * Registra resultado de um trial e atualiza o SNR para o próximo.
     * correct: boolean (triplet inteiro correto)
     */
    submitTrial({ seq, userAnswer, correct }) {
        const c = this.config;
        const s = this.state;

        if (s.finished) return this.getSummary();

        const trialIndex = s.trialIndex;
        const snrDbBefore = s.snrDb;

        // salva o trial
        s.trials.push({
            trialIndex,
            snrDb: snrDbBefore,
            correct: Boolean(correct),
            seq: Array.isArray(seq) ? seq : null,
            userAnswer: userAnswer ?? null,
            at: nowIso()
        });

        // regra 1-up/1-down:
        // acerto -> mais difícil (SNR diminui)
        // erro   -> mais fácil (SNR aumenta)
        const directionTo = correct ? 'down' : 'up';
        const delta = correct ? -s.stepDb : +s.stepDb;

        // detecta reversal (mudou direção)
        if (s.lastDirection && s.lastDirection !== directionTo) {
            s.reversals.push({
                trialIndex,
                snrDb: snrDbBefore,
                at: nowIso(),
                directionFrom: s.lastDirection,
                directionTo
            });

            // reduz step após X reversals (fica mais fino)
            if (s.reversals.length === c.reduceStepAfterReversals) {
                s.stepDb = c.finalStepDb;
            }
        }

        s.lastDirection = directionTo;

        // atualiza snr e clamp
        s.snrDb = clamp(snrDbBefore + delta, c.minSnrDb, c.maxSnrDb);

        // incrementa trial
        s.trialIndex += 1;

        // checa parada
        if (s.trialIndex >= c.maxTrials) {
            s.finished = true;
            s.finishedReason = 'maxTrials';
        } else if (s.reversals.length >= c.targetReversals) {
            s.finished = true;
            s.finishedReason = 'targetReversals';
        }

        return this.getSummary();
    }

    /**
     * Calcula SRT e resumo.
     */
    getSummary() {
        const c = this.config;
        const s = this.state;

        const srt = this._computeSrt();

        const acc = s.trials.length ? s.trials.filter((t) => t.correct).length / s.trials.length : 0;

        return {
            locale: s.locale,
            finished: s.finished,
            finishedReason: s.finishedReason,

            trialsCount: s.trials.length,
            reversalsCount: s.reversals.length,

            currentSnrDb: s.snrDb,
            currentStepDb: s.stepDb,

            accuracy: acc,

            srtDb: srt,
            classification: srt == null ? null : classifySrt(srt),

            trials: s.trials,
            reversals: s.reversals,
            config: c
        };
    }

    _computeSrt() {
        const c = this.config;
        const s = this.state;

        if (!s.trials.length) return null;

        if (c.srtMethod === 'lastN') {
            const n = c.srtLastN;
            const slice = s.trials.slice(-n);
            const avg = slice.reduce((sum, t) => sum + t.snrDb, 0) / slice.length;
            return round1(avg);
        }

        // default: reversals
        if (!s.reversals.length) return null;

        const n = c.srtReversalsN;
        const slice = s.reversals.slice(-n);
        const avg = slice.reduce((sum, r) => sum + r.snrDb, 0) / slice.length;
        return round1(avg);
    }
}

function round1(x) {
    return Math.round(x * 10) / 10;
}

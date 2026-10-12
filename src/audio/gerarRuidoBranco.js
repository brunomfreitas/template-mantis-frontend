let audioContext = null;
let currentSource = null;

export const playWhiteNoise = ({
    db = 0,
    duration = null,
    ear = 'both' // "left" | "right" | "both"
} = {}) => {
    if (!audioContext) {
        audioContext = new AudioContext();
    }

    const amplitude = Math.pow(10, db / 20);

    const bufferSize = 2 * audioContext.sampleRate;

    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);

    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const source = audioContext.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = amplitude;

    const panner = audioContext.createStereoPanner();

    if (ear === 'left') panner.pan.value = -1;
    if (ear === 'right') panner.pan.value = 1;
    if (ear === 'both') panner.pan.value = 0;

    source.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(audioContext.destination);

    source.start();

    currentSource = source;

    if (duration) {
        setTimeout(() => {
            stopWhiteNoise();
        }, duration * 1000);
    }
};

export const stopWhiteNoise = () => {
    if (currentSource) {
        currentSource.stop();
        currentSource = null;
    }
};

/*

Como usar:
	ruído branco -10 dB nos dois ouvidos
	playWhiteNoise({ db: -10 })

	ruído branco -20 dB ouvido esquerdo
	playWhiteNoise({
  		db: -20,
  		ear: "left"
	})

	ruído branco 5 segundos ouvido direito
	playWhiteNoise({
  		db: -15,
  		ear: "right",
  		duration: 5
	})

	parar o ruído
	stopWhiteNoise()

*/

import { DinStaircaseEngine } from 'audio/dinEngine';
import { DinPlayer } from 'audio/dinPlayer';
import { useEffect, useRef, useState } from 'react';

export default function DinTest() {
    const playerRef = useRef(null);
    const engineRef = useRef(null);

    const [ready, setReady] = useState(false);

    const [currentSeq, setCurrentSeq] = useState([]);
    const [currentSnrDb, setCurrentSnrDb] = useState(null);

    const [answer, setAnswer] = useState('');

    const [summary, setSummary] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    // parâmetros fáceis de ajustar no MVP
    const NOISE_DB = -20; // nível base do ruído

    useEffect(() => {
        playerRef.current = new DinPlayer({
            locale: 'pt-BR',
            basePath: '/audio',
            gapMs: 350,
            noiseDb: NOISE_DB,
            snrDb: 0 // só default; o engine vai sobrescrever por trial
        });

        engineRef.current = new DinStaircaseEngine({
            locale: 'pt-BR',
            startSnrDb: 0,
            minSnrDb: -16,
            maxSnrDb: 10,

            initialStepDb: 6,
            finalStepDb: 2,
            reduceStepAfterReversals: 4,

            maxTrials: 25,
            targetReversals: 10,

            srtMethod: 'reversals',
            srtReversalsN: 6
        });

        return () => {
            playerRef.current?.dispose();
        };
    }, []);

    async function handleInit() {
        await playerRef.current.init();

        // seta ruído base e inicia
        playerRef.current.setLevels({ noiseDb: NOISE_DB });
        playerRef.current.startNoise();

        // pega o primeiro SNR do engine
        const params = engineRef.current.getCurrentTrialParams();
        setCurrentSnrDb(params.snrDb);

        setReady(true);
    }

    async function handlePlay() {
        if (!ready || isFinished) return;

        const params = engineRef.current.getCurrentTrialParams();
        const snrDb = params.snrDb;

        const seq = playerRef.current.generateTriplet();
        setCurrentSeq(seq);
        setCurrentSnrDb(snrDb);
        setAnswer('');

        // toca aplicando SNR atual
        await playerRef.current.playDigitsSequence(seq, { snrDb });
    }

    function handleCheck() {
        if (!ready || !currentSeq.length || isFinished) return;

        const normalized = answer.replace(/\s+/g, '');
        const correctSeq = currentSeq.join('');
        const isCorrect = normalized === correctSeq;

        // registra no engine (isso atualiza o SNR pro próximo trial)
        const newSummary = engineRef.current.submitTrial({
            seq: currentSeq,
            userAnswer: normalized,
            correct: isCorrect
        });

        setSummary(newSummary);

        if (newSummary.finished) {
            setIsFinished(true);

            const msg =
                `✅ Teste finalizado\n\n` +
                `SRT: ${newSummary.srtDb ?? '—'} dB SNR\n` +
                `Classificação: ${newSummary.classification?.label ?? '—'}\n` +
                `Tentativas: ${newSummary.trialsCount}\n` +
                `Reversals: ${newSummary.reversalsCount}`;

            alert(msg);
            return;
        }

        // atualiza o SNR atual (próxima rodada)
        setCurrentSnrDb(newSummary.currentSnrDb);

        alert(
            isCorrect
                ? `✅ Acertou! Próximo SNR: ${newSummary.currentSnrDb} dB`
                : `❌ Errou (correto: ${correctSeq}). Próximo SNR: ${newSummary.currentSnrDb} dB`
        );
    }

    function handleReset() {
        engineRef.current.reset();
        setSummary(null);
        setIsFinished(false);
        setCurrentSeq([]);
        setAnswer('');

        const params = engineRef.current.getCurrentTrialParams();
        setCurrentSnrDb(params.snrDb);

        alert('🔄 Reiniciado.');
    }

    return (
        <div style={{ padding: 16 }}>
            <h2>Digits-in-Noise (MVP)</h2>

            {!ready ? (
                <button onClick={handleInit}>Inicializar áudio</button>
            ) : (
                <>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button onClick={handlePlay} disabled={isFinished}>
                            Tocar 3 números
                        </button>

                        <button onClick={handleReset}>Reiniciar</button>

                        <span style={{ marginLeft: 12 }}>
                            <b>SNR atual:</b> {currentSnrDb ?? '—'} dB
                        </span>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Digite os 3 números (ex: 492)"
                            disabled={isFinished}
                        />
                        <button onClick={handleCheck} style={{ marginLeft: 8 }} disabled={isFinished || !currentSeq.length}>
                            Confirmar
                        </button>
                    </div>

                    {summary && (
                        <div style={{ marginTop: 16, fontFamily: 'monospace' }}>
                            <div>trials: {summary.trialsCount}</div>
                            <div>reversals: {summary.reversalsCount}</div>
                            <div>stepDb: {summary.currentStepDb}</div>
                            <div>acc: {(summary.accuracy * 100).toFixed(0)}%</div>
                            <div>SRT: {summary.srtDb ?? '—'} dB SNR</div>
                            <div>class: {summary.classification?.label ?? '—'}</div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

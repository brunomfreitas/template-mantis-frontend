// import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
// import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
// import { playWhiteNoise, stopWhiteNoise } from 'audio/gerarRuidoBranco';
// import PropTypes from 'prop-types';
// import { useEffect, useRef, useState } from 'react';

// const formatTime = (seconds) => {
//     if (isNaN(seconds)) return '00:00';

//     const min = Math.floor(seconds / 60)
//         .toString()
//         .padStart(2, '0');

//     const sec = Math.floor(seconds % 60)
//         .toString()
//         .padStart(2, '0');

//     return `${min}:${sec}`;
// };

// const audio_instrucao = '/public/audio/pt-BR/frases/instrucao_5_db.wav';
// const audio_boca = '/public/audio/pt-BR/frases/boca_5_db.wav';
// const audio_bota = '/public/audio/pt-BR/frases/bota_5_db.wav';
// const audio_gato = '/public/audio/pt-BR/frases/gato_5_db.wav';
// const audio_lata = '/public/audio/pt-BR/frases/lata_5_db.wav';
// const audio_vaca = '/public/audio/pt-BR/frases/vaca_5_db.wav';
// const audio_pata = '/public/audio/pt-BR/frases/pata_5_db.wav';

// const AudioPlayerCircle = ({ src, title }) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const audioRef = useRef(null);

//     const handlePlay = async () => {
//         if (!audioRef.current) return;

//         try {
//             playWhiteNoise({ db: 0 });
//             await audioRef.current.play();
//             setIsPlaying(true);
//         } catch (error) {
//             console.error('Erro ao reproduzir áudio:', error);
//         }
//     };

//     const handlePause = () => {
//         if (!audioRef.current) return;

//         stopWhiteNoise();
//         audioRef.current.pause();
//         setIsPlaying(false);
//     };

//     const handleSliderChange = (event, value) => {
//         if (!audioRef.current) return;

//         audioRef.current.currentTime = value;
//         setCurrentTime(value);
//     };

//     useEffect(() => {
//         const audio = audioRef.current;
//         if (!audio) return;

//         const handleTimeUpdate = () => {
//             setCurrentTime(audio.currentTime);
//         };

//         const handleLoadedMetadata = () => {
//             setDuration(audio.duration || 0);
//         };

//         const handleEnded = () => {
//             stopWhiteNoise();
//             setIsPlaying(false);
//             setCurrentTime(0);
//         };

//         const handlePlayEvent = () => {
//             setIsPlaying(true);
//         };

//         const handlePauseEvent = () => {
//             setIsPlaying(false);
//         };

//         audio.addEventListener('timeupdate', handleTimeUpdate);
//         audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//         audio.addEventListener('ended', handleEnded);
//         audio.addEventListener('play', handlePlayEvent);
//         audio.addEventListener('pause', handlePauseEvent);

//         return () => {
//             audio.removeEventListener('timeupdate', handleTimeUpdate);
//             audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//             audio.removeEventListener('ended', handleEnded);
//             audio.removeEventListener('play', handlePlayEvent);
//             audio.removeEventListener('pause', handlePauseEvent);
//         };
//     }, []);

//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 maxWidth: 400,
//                 mx: 'auto',
//                 px: 2,
//                 py: 1
//             }}
//         >
//             <Stack spacing={0}>
//                 <Typography
//                     variant="h3"
//                     sx={{
//                         textAlign: 'center',
//                         fontWeight: 600
//                     }}
//                 >
//                     {title}
//                 </Typography>

//                 <Slider
//                     value={currentTime}
//                     min={0}
//                     max={duration || 0}
//                     step={1}
//                     onChange={handleSliderChange}
//                     sx={{
//                         width: '100%',
//                         '& .MuiSlider-rail': {
//                             height: 3
//                         },
//                         '& .MuiSlider-track': {
//                             height: 5
//                         }
//                     }}
//                 />

//                 <Stack direction="row" alignItems="center" justifyContent="space-between">
//                     <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: -1 }}>
//                         {formatTime(currentTime)}
//                     </Typography>

//                     {isPlaying ? (
//                         <IconButton color="primary" onClick={handlePause}>
//                             <PauseOutlined style={{ fontSize: 30 }} />
//                         </IconButton>
//                     ) : (
//                         <IconButton color="primary" onClick={handlePlay}>
//                             <CaretRightOutlined style={{ fontSize: 30 }} />
//                         </IconButton>
//                     )}

//                     <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: -1 }}>
//                         {formatTime(duration)}
//                     </Typography>
//                 </Stack>
//             </Stack>

//             <audio ref={audioRef}>
//                 <source src={src} type="audio/mpeg" />
//                 <track kind="captions" srcLang="pt" label="Português" />
//             </audio>
//         </Box>
//     );
// };

// AudioPlayerCircle.propTypes = {
//     src: PropTypes.string.isRequired,
//     title: PropTypes.string
// };

// export default AudioPlayerCircle;

import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import { playWhiteNoise, stopWhiteNoise } from 'audio/gerarRuidoBranco';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const INTERVAL_BETWEEN_AUDIOS = 6; // segundos

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';

    const min = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');

    const sec = Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0');

    return `${min}:${sec}`;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAudioDuration = (src) => {
    return new Promise((resolve) => {
        const audio = new Audio(src);

        const handleLoadedMetadata = () => {
            cleanup();
            resolve(audio.duration || 0);
        };

        const handleError = () => {
            cleanup();
            resolve(0);
        };

        const cleanup = () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
    });
};

const audio_instrucao = '/audio/pt-BR/frases/instrucao_5_db.wav';
const audio_boca = '/audio/pt-BR/frases/boca_5_db.wav';
const audio_bota = '/audio/pt-BR/frases/bota_5_db.wav';
const audio_gato = '/audio/pt-BR/frases/gato_5_db.wav';
const audio_lata = '/audio/pt-BR/frases/lata_5_db.wav';
const audio_vaca = '/audio/pt-BR/frases/vaca_5_db.wav';
const audio_pata = '/audio/pt-BR/frases/pata_5_db.wav';

const AudioPlayerCircle = ({ title, onTimeChange }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [examTime, setExamTime] = useState(0);
    const [examDuration, setExamDuration] = useState(0);

    const audioRef = useRef(null);
    const stopSequenceRef = useRef(false);
    const timerRef = useRef(null);
    const mountedRef = useRef(true);

    const sequence = [audio_instrucao, audio_boca, audio_bota, audio_gato, audio_lata, audio_vaca, audio_pata];

    const examStartRef = useRef(null);

    const startExamTimer = () => {
        clearInterval(timerRef.current);

        examStartRef.current = Date.now();

        timerRef.current = setInterval(() => {
            const elapsed = (Date.now() - examStartRef.current) / 1000;
            setExamTime(Number(elapsed.toFixed(2))); // 👈 milissegundos (2 casas)
        }, 100);
    };

    const stopExamTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const resetExam = () => {
        stopExamTimer();
        stopWhiteNoise();

        examStartRef.current = null;

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.removeAttribute('src');
            audioRef.current.load();
        }

        setIsPlaying(false);
        setExamTime(0);
    };

    const calculateTotalDuration = async () => {
        let total = 0;

        for (let i = 0; i < sequence.length; i++) {
            const duration = await getAudioDuration(sequence[i]);
            total += duration;
            total += INTERVAL_BETWEEN_AUDIOS; // agora sempre soma
        }

        if (mountedRef.current) {
            setExamDuration(total);
        }

        return total;
    };

    const playAudioAndWaitEnd = (audioElement, audioSrc) => {
        return new Promise((resolve, reject) => {
            if (!audioElement) {
                reject(new Error('Elemento de áudio não encontrado.'));
                return;
            }

            const handleEnded = () => {
                cleanup();
                resolve();
            };

            const handleError = () => {
                cleanup();
                reject(new Error(`Erro ao reproduzir o áudio: ${audioSrc}`));
            };

            const cleanup = () => {
                audioElement.removeEventListener('ended', handleEnded);
                audioElement.removeEventListener('error', handleError);
            };

            audioElement.addEventListener('ended', handleEnded);
            audioElement.addEventListener('error', handleError);

            audioElement.src = audioSrc;
            audioElement.load();

            audioElement
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    cleanup();
                    reject(error);
                });
        });
    };

    const handlePlay = async () => {
        if (!audioRef.current || isPlaying) return;

        try {
            stopSequenceRef.current = false;
            setExamTime(0);

            await calculateTotalDuration();

            playWhiteNoise({ db: 0 });
            setIsPlaying(true);
            startExamTimer();

            for (let i = 0; i < sequence.length; i++) {
                if (stopSequenceRef.current) break;

                // console.log('antes:', i, 'time:', Math.min(examTime, examDuration || 0));
                await playAudioAndWaitEnd(audioRef.current, sequence[i]);
                // console.log('depois:', i, 'time', Math.min(examTime, examDuration || 0));

                if (stopSequenceRef.current) break;

                await wait(INTERVAL_BETWEEN_AUDIOS * 1000);
            }
        } catch (error) {
            console.error('Erro ao reproduzir sequência de áudios:', error);
        } finally {
            resetExam();
        }
    };

    const handlePause = () => {
        stopSequenceRef.current = true;
        resetExam();
    };

    useEffect(() => {
        mountedRef.current = true;

        calculateTotalDuration();

        return () => {
            mountedRef.current = false;
            stopSequenceRef.current = true;
            stopExamTimer();
            stopWhiteNoise();
        };
    }, []);

    useEffect(() => {
        if (examDuration > 0 && examTime >= Math.ceil(examDuration) && isPlaying) {
            resetExam();
        }
    }, [examTime, examDuration, isPlaying]);

    useEffect(() => {
        onTimeChange(examTime);
    }, [examTime, onTimeChange]);

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 400,
                mx: 'auto',
                px: 2,
                py: 1
            }}
        >
            <Stack spacing={0}>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 600
                    }}
                >
                    {title}
                </Typography>

                <Slider
                    value={Math.min(examTime, examDuration || 0)}
                    min={0}
                    max={examDuration || 0}
                    step={1}
                    disabled
                    sx={{
                        width: '100%',
                        '& .MuiSlider-rail': {
                            height: 3
                        },
                        '& .MuiSlider-track': {
                            height: 5
                        }
                    }}
                />

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: -1 }}>
                        {formatTime(examTime)}
                    </Typography>

                    {isPlaying ? (
                        <IconButton color="primary" onClick={handlePause}>
                            <PauseOutlined style={{ fontSize: 30 }} />
                        </IconButton>
                    ) : (
                        <IconButton color="primary" onClick={handlePlay}>
                            <CaretRightOutlined style={{ fontSize: 30 }} />
                        </IconButton>
                    )}

                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: -1 }}>
                        {formatTime(examDuration)}
                    </Typography>
                </Stack>
            </Stack>

            <audio ref={audioRef}>
                <track kind="captions" srcLang="pt" label="Português" />
            </audio>
        </Box>
    );
};

AudioPlayerCircle.propTypes = {
    title: PropTypes.string
};

AudioPlayerCircle.defaultProps = {
    title: 'Exame Auditivo'
};

export default AudioPlayerCircle;

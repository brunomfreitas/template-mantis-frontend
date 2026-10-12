import { CloseOutlined } from '@ant-design/icons';
import { Box, Card, CardMedia, Grid, IconButton, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import Layout from 'layout';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'store';
import { update } from 'store/reducers/figura-fundo';
import * as Yup from 'yup';
const FIGURAS_BASE = [
    { id: 1, imagem: '/assets/images/fechamento-auditivo/boca.png' },
    { id: 2, imagem: '/assets/images/fechamento-auditivo/bota.png' },
    { id: 3, imagem: '/assets/images/fechamento-auditivo/gato.png' },
    { id: 4, imagem: '/assets/images/fechamento-auditivo/lata.png' },
    { id: 5, imagem: '/assets/images/fechamento-auditivo/vaca.png' },
    { id: 6, imagem: '/assets/images/fechamento-auditivo/pata.png' }
];

const JANELAS_RESPOSTA = [
    { inicio: 10, fim: 18, figuraId: 1, figuraNome: 'boca' },
    { inicio: 18, fim: 26, figuraId: 2, figuraNome: 'bota' },
    { inicio: 26, fim: 34, figuraId: 3, figuraNome: 'gato' },
    { inicio: 34, fim: 42, figuraId: 4, figuraNome: 'lata' },
    { inicio: 42, fim: 48, figuraId: 5, figuraNome: 'vaca' },
    { inicio: 48, fim: 54, figuraId: 6, figuraNome: 'pata' }
];

const getFiguraEsperadaPorTempo = (tempoAtual) => {
    return JANELAS_RESPOSTA.find((janela) => tempoAtual >= janela.inicio && tempoAtual < janela.fim) || null;
};

const shuffleArray = (array) => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
};

const validarCliqueFigura = (figuraClicada, tempoAtual) => {
    const figuraEsperada = getFiguraEsperadaPorTempo(tempoAtual);

    if (!figuraEsperada) {
        return {
            acertou: false,
            tempoClique: tempoAtual,
            figuraEsperada: null,
            clicouForaDaJanela: true
        };
    }

    return {
        acertou: figuraClicada.id === figuraEsperada.figuraId,
        tempoClique: tempoAtual,
        figuraEsperada,
        clicouForaDaJanela: false
    };
};

const shuffleArrayNoRepeat = (array, previous) => {
    if (!previous) return shuffleArray(array);

    let shuffled;

    do {
        shuffled = shuffleArray(array);
    } while (shuffled.some((item, index) => item.id === previous[index].id));

    return shuffled;
};

const getCampoIdentificada = (id) => `st_figura_${id}_identificada`;
const getCampoTempo = (id) => `ss_tempo_resposta_figura_${id}`;

const DialogFechamentoAuditivoExame = ({ open, setOpen, initialValues }) => {
    const dispatch = useDispatch();

    const [tempoExameAtual, setTempoExameAtual] = useState(0);
    const [figuras, setFiguras] = useState(() => shuffleArray(FIGURAS_BASE));
    const inicioSolicitacaoRef = useRef(null);

    const embaralhar = () => {
        setFiguras((prev) => shuffleArrayNoRepeat(FIGURAS_BASE, prev));
        inicioSolicitacaoRef.current = null;
    };

    const registrarResulado = (obj) => {
        dispatch(update(obj.id_figura_fundo, obj));
    };

    useEffect(() => {
        if (open) {
            embaralhar();
        }
    }, [open]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            cs_recusa: Yup.boolean()
        })
    });

    const { values, setFieldValue } = formik;

    console.log('dialog figura-fundo', values);

    const handleClickFigura = (figura) => {
        const resultado = validarCliqueFigura(figura, tempoExameAtual);

        if (!resultado.figuraEsperada) {
            console.log('Clique fora da janela de resposta');
            return;
        }

        const figuraEsperadaId = resultado.figuraEsperada.figuraId;

        const campoIdentificada = getCampoIdentificada(figuraEsperadaId);
        const campoTempo = getCampoTempo(figuraEsperadaId);
        const tempoRelativoResposta = resultado.figuraEsperada
            ? Number((tempoExameAtual - resultado.figuraEsperada.inicio).toFixed(2))
            : null;

        // console.log('tempoExameAtual:', tempoExameAtual);
        // console.log('values:', values);
        // console.log('figura clicada:', figura);
        // console.log('resultado:', resultado);
        // console.log('campoIdentificada:', campoIdentificada);
        // console.log('campoTempo:', campoTempo);
        // console.log('tempoRelativoResposta:', tempoRelativoResposta);

        console.log(resultado.acertou === true ? 'Acertou: Sim' : 'Acertou: Não');
        console.log('Tempo de Resposta:', tempoRelativoResposta);

        const obj = {
            id_prontuario: values.id_prontuario,
            id_figura_fundo: values.id_figura_fundo,
            [campoIdentificada]: resultado.acertou,
            [campoTempo]: resultado.tempoClique
        };

        setFieldValue(campoIdentificada, resultado.acertou);
        setFieldValue(campoTempo, resultado.tempoClique);

        registrarResulado(obj);
        embaralhar();
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullScreen
            PaperProps={{
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: { xs: 1.5, sm: 2, md: 3 },
                    py: 1.5,
                    flexShrink: 0,
                    minHeight: 80
                }}
            >
                <AudioPlayerCircle
                    src="/assets/audios/pac/fechamento-auditivo-figuras/audio-1.mp3"
                    variant="contained"
                    color="error"
                    onTimeChange={setTempoExameAtual}
                    title="Exame de Fechamento Auditivo"
                />

                <Stack
                    direction="row"
                    spacing={0}
                    sx={{
                        mr: 0,
                        mt: -10
                    }}
                >
                    <IconButton color="error" onClick={() => setOpen(false)}>
                        <CloseOutlined />
                    </IconButton>
                </Stack>
            </Box>

            <DialogContent
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    p: { xs: 1, sm: 1.5, md: 2 }
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 1.5, sm: 2, md: 3 }}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        height: '100%',
                        m: 0
                    }}
                >
                    {figuras.map((figura) => (
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            key={figura.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: {
                                    xs: 'calc((100vh - 140px) / 3)',
                                    sm: 'calc((100vh - 150px) / 2)',
                                    md: 'calc((100vh - 170px) / 2)'
                                }
                            }}
                        >
                            <Card
                                onClick={() => handleClickFigura(figura)}
                                sx={{
                                    width: '100%',
                                    maxWidth: {
                                        xs: 140,
                                        sm: 220,
                                        md: 280,
                                        lg: 320
                                    },
                                    height: '100%',
                                    maxHeight: {
                                        xs: 140,
                                        sm: 220,
                                        md: 280,
                                        lg: 320
                                    },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    boxShadow: 3,
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={figura.imagem}
                                    alt={`Figura ${figura.id}`}
                                    sx={{
                                        width: '82%',
                                        height: '82%',
                                        objectFit: 'contain',
                                        display: 'block'
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

DialogFechamentoAuditivoExame.propTypes = {
    initialValues: PropTypes.object,
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

DialogFechamentoAuditivoExame.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default DialogFechamentoAuditivoExame;

import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Fab,
    FormGroup,
    Grid,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import { useFormikContext } from 'formik';
import Layout from 'layout';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'store';
import { update } from 'store/reducers/figura-fundo';
import { openSnackbar } from 'store/reducers/snackbar';
import DialogFechamentoAuditivoExame from './dialogs/dialog-fechamento-auditivo-exame';

const FechamentoAuditivoFiguraForm = (props) => {
    const { title, anos } = props;

    const theme = useTheme();
    const dispatch = useDispatch();

    const { values, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = useFormikContext();

    // =========================
    // PATH DO FORM
    // =========================

    const figuraPath = 'pac[0].figura_fundo';

    const figuraFundo = useMemo(() => {
        return values?.pac?.[0]?.figura_fundo || {};
    }, [values]);

    // =========================
    // HELPERS
    // =========================

    const updateFigura = (campo, valor) => {
        console.log(`${figuraPath}.${campo}`, valor);
        setFieldValue(`${figuraPath}.${campo}`, valor);
        if (!valor) {
            setFieldValue(`${figuraPath}.ds_figura_fundo`, null);
            atualizar({
                id_figura_fundo: figuraFundo.id_figura_fundo,
                cs_recusa: false,
                ds_figura_fundo: null
            });
        }
    };

    // =========================
    // RESULTADO
    // =========================

    function contarValoresTrue(figura) {
        if (!figura) {
            return {
                label: 'Iniciar',
                color: 'primary'
            };
        }

        let contador = 0;

        Object.entries(figura).forEach(([chave, valor]) => {
            if (chave.includes('_identificada') && valor === true) {
                contador++;
            }
        });

        // menores de 7 anos
        if ((anos < 7 && contador > 4) || (anos >= 7 && contador === 6)) {
            return {
                label: 'Esperado',
                color: 'success.main'
            };
        }

        if ((anos < 7 && contador === 4) || (anos >= 7 && contador === 5)) {
            return {
                label: 'Atenção Pedagógica',
                color: 'warning.main'
            };
        }

        return {
            label: 'Risco Funcional',
            color: 'error.main'
        };
    }

    const resultado = contarValoresTrue(figuraFundo);

    // =========================
    // UPDATE API
    // =========================

    const atualizar = async (data) => {
        try {
            setSubmitting(true);

            // console.log('values.pac[0].figura_fundo', values.pac[0].figura_fundo);

            await dispatch(update(data.id_figura_fundo, data));

            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Fechamento Auditivo atualizado com sucesso!',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    }
                })
            );
        } finally {
            setSubmitting(false);
        }
    };

    // =========================
    // DIALOGS
    // =========================

    const [openTeste, setOpenTeste] = useState(false);
    const [openExame, setOpenExame] = useState(false);

    // =========================
    // RENDER
    // =========================

    return (
        <>
            <MainCard
                title={title}
                content={false}
                secondary={
                    <FormControl>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={`${figuraPath}.cs_recusa`}
                                        checked={Boolean(figuraFundo?.cs_recusa)}
                                        onChange={(e) => {
                                            updateFigura('cs_recusa', e.target.checked);
                                        }}
                                        color="secondary"
                                        className="size-medium"
                                    />
                                }
                                label="Recusa"
                                labelPlacement="top"
                            />
                        </FormGroup>
                    </FormControl>
                }
            >
                <CardContent>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        Instruções para Aplicação
                    </Typography>

                    <Typography variant="body1">
                        Este exame avalia a habilidade do paciente em reconhecer palavras em meio a ruídos e associá-las corretamente a
                        figuras.
                        <br />
                        Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente.
                        <br />
                        Clique em <strong>Iniciar</strong> para dar início à aplicação do exame com palavras encobertas por ruído e
                        associação com imagens.
                    </Typography>
                </CardContent>

                <Divider />

                {figuraFundo?.cs_recusa === true ? (
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={12}>
                            <TextField
                                id="ds_figura_fundo"
                                name={`${figuraPath}.ds_figura_fundo`}
                                label={<FormattedMessage id="prontuario.ds_figura_fundo" />}
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={figuraFundo?.ds_figura_fundo || ''}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="shadow"
                                color="secondary"
                                onClick={() => atualizar(values.pac[0].figura_fundo)}
                                disabled={isSubmitting}
                                startIcon={isSubmitting && <CircularProgress size={20} />}
                            >
                                Salvar Recusa
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <ToggleButtonGroup
                        fullWidth
                        color="primary"
                        exclusive
                        aria-label="text alignment"
                        size="small"
                        sx={{
                            p: 1,
                            '& .MuiToggleButton-root': {
                                borderRadius: 0,
                                p: 0.75,
                                '&:not(.Mui-selected)': {
                                    borderTopColor: 'transparent',
                                    borderBottomColor: 'transparent'
                                },
                                '&:first-of-type': {
                                    borderLeftColor: 'transparent'
                                },
                                '&:last-of-type': {
                                    borderRightColor: 'transparent'
                                },
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    color: theme.palette.primary.main
                                }
                            }
                        }}
                    >
                        <ToggleButton value="teste" aria-label="teste" disableRipple>
                            <Button variant="shadow" color="secondary" onClick={() => setOpenTeste(true)}>
                                Teste
                            </Button>
                        </ToggleButton>

                        {[
                            figuraFundo?.st_figura_1_identificada,
                            figuraFundo?.st_figura_2_identificada,
                            figuraFundo?.st_figura_3_identificada,
                            figuraFundo?.st_figura_4_identificada
                        ].every((item) => item === false || item == null) ? (
                            <ToggleButton value="iniciar" aria-label="iniciar" disableRipple>
                                <Button variant="shadow" color="success" onClick={() => setOpenExame(true)}>
                                    Iniciar
                                </Button>
                            </ToggleButton>
                        ) : (
                            <ToggleButton value="resultado" aria-label="resultado" disableRipple onClick={() => setOpenExame(true)}>
                                <Stack
                                    direction="column"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{
                                        display: 'flex',
                                        ml: 2
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1">Resultado</Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                color: resultado.color
                                            }}
                                        >
                                            {resultado.label}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                )}
            </MainCard>

            {/* =========================
                DIALOG TESTE
            ========================= */}

            <Dialog fullScreen open={openTeste} onClose={() => setOpenTeste(false)}>
                <DialogTitle>Teste de Fechamento Auditivo</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Durante a leitura de uma história, você será solicitado a identificar a figura correspondente. Esteja atento!
                    </DialogContentText>

                    <br />

                    <DialogContentText>Veja os exemplos antes de prosseguir</DialogContentText>

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MainCard
                                    title={
                                        <Typography variant="subtitle1" textAlign="center">
                                            Diga a ordem dos sons que ouviu:
                                        </Typography>
                                    }
                                    content={false}
                                >
                                    <CardContent>
                                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                                            <AudioPlayerCircle
                                                src="/assets/audios/pac/fechamento-auditivo-figuras/teste-1.mp3"
                                                variant="contained"
                                                color="error"
                                            />

                                            {/* TESTE 1 */}

                                            <Grid item xs={3}>
                                                <Fab
                                                    color={
                                                        figuraFundo?.cs_teste_1
                                                            ? theme.palette.secondary.light
                                                            : theme.palette.secondary.dark
                                                    }
                                                    variant={figuraFundo?.cs_teste_1 ? 'contained' : 'outlined'}
                                                    sx={{
                                                        width: 170,
                                                        height: 170
                                                    }}
                                                    onClick={() => {
                                                        updateFigura('cs_teste_1', !figuraFundo?.cs_teste_1);
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            figuraFundo?.cs_teste_1
                                                                ? '/assets/images/imagensAnimals/avatar-t1-1.png'
                                                                : '/assets/images/imagensAnimals/avatar-t1.png'
                                                        }
                                                        sx={{
                                                            width: 150,
                                                            height: 150
                                                        }}
                                                    />
                                                </Fab>
                                            </Grid>

                                            {/* TESTE 2 */}

                                            <Grid item xs={3}>
                                                <Fab
                                                    color={
                                                        figuraFundo?.cs_teste_2
                                                            ? theme.palette.secondary.light
                                                            : theme.palette.secondary.dark
                                                    }
                                                    variant={figuraFundo?.cs_teste_2 ? 'contained' : 'outlined'}
                                                    sx={{
                                                        width: 170,
                                                        height: 170
                                                    }}
                                                    onClick={() => {
                                                        updateFigura('cs_teste_2', !figuraFundo?.cs_teste_2);
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            figuraFundo?.cs_teste_2
                                                                ? '/assets/images/imagensAnimals/avatar-t2-2.png'
                                                                : '/assets/images/imagensAnimals/avatar-t2.png'
                                                        }
                                                        sx={{
                                                            width: 150,
                                                            height: 150
                                                        }}
                                                    />
                                                </Fab>
                                            </Grid>
                                        </Stack>
                                    </CardContent>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenTeste(false)}>Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* =========================
                EXAME
            ========================= */}

            <DialogFechamentoAuditivoExame open={openExame} setOpen={setOpenExame} initialValues={figuraFundo} />
        </>
    );
};

FechamentoAuditivoFiguraForm.propTypes = {
    title: PropTypes.string,
    anos: PropTypes.number
};

FechamentoAuditivoFiguraForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default FechamentoAuditivoFiguraForm;

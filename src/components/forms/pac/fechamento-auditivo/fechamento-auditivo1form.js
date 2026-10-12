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
import 'dayjs/locale/de';
import 'dayjs/locale/zh-cn';
import { useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/localizacao-sonora';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

const FechamentoAuditivo1Form = (props) => {
    const { initialValues } = props;

    const router = useRouter();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id } = router.query;

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            cs_recusa: Yup.boolean(),
            cs_figura_1: Yup.boolean(),
            cs_figura_2: Yup.boolean(),
            cs_figura_3: Yup.boolean(),
            cs_figura_4: Yup.boolean(),
            cs_figura_5: Yup.boolean(),
            cs_figura_6: Yup.boolean(),
            cs_figura_7: Yup.boolean(),
            cs_figura_8: Yup.boolean()
        }),
        // onSubmit: (values) => {
        onSubmit: () => {
            try {
                console.log('submit funcionou', values);
            } catch (error) {
                console.error(error);
            }
        }
    });

    function contarValoresTrue(objeto) {
        let contador = 0;
        for (const chave in objeto) {
            if (chave.startsWith('cs_figura_') && objeto[chave] === true) {
                contador++;
            }
        }
        return ((contador / 8) * 100).toFixed(2) + '%';
    }

    // const changeValue = (campo, valor) => {
    //   if (valor === 'true') {
    //     setFieldValue(campo, true);
    //   }

    //   if (valor === 'false') {
    //     setFieldValue(campo, false);
    //   }
    // };

    const atualizar = (values) => {
        setSubmitting(true);
        dispatch(editar(values.id_fechamento_auditivo, values))
            .then(() => {
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
            })
            .finally(() => {
                dispatch(getId(id));
                setSubmitting(false);
            });
    };

    const [openTeste, setOpenTeste] = useState(false);

    const handleOpenTeste = (open) => {
        setOpenTeste(open);
    };

    const [openExame, setOpenExame] = useState(false);

    const handleOpenExame = (open) => {
        setOpenExame(open);
    };

    // const imageMap = {
    //   female: '/assets/images/maintenance/coming-soon.png',
    //   male: '/assets/images/maintenance/Error404.png',
    //   other: '/assets/images/maintenance/Error500.png'
    // };

    const { values, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

    return (
        <>
            <MainCard
                title="Fechamento Auditivo Figura"
                content={false}
                secondary={
                    <>
                        <FormControl>
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="cs_recusa"
                                            checked={values.cs_recusa}
                                            onChange={handleChange}
                                            color="secondary"
                                            className="size-medium"
                                        />
                                    }
                                    label="Recusa"
                                    labelPlacement="top"
                                />
                            </FormGroup>
                        </FormControl>
                    </>
                }
            >
                <CardContent>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Card Subtitle
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu.
                    </Typography>
                </CardContent>
                <Divider />
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
                    <ToggleButton value="web" aria-label="web" disableRipple>
                        <Button variant="shadow" color="secondary" onClick={() => handleOpenTeste(true)}>
                            Teste
                        </Button>
                    </ToggleButton>
                    {values.cs_recusa === true ? (
                        <ToggleButton value="android" aria-label="android" disableRipple>
                            <Button variant="shadow" color="secondary" onClick={() => atualizar(values)}>
                                Salvar Recusa
                            </Button>
                        </ToggleButton>
                    ) : values.cs_n_1 === false && values.cs_i_1 === false && values.cs_r_1 === undefined ? (
                        <ToggleButton value="android" aria-label="android" disableRipple>
                            <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                                Iniciar
                            </Button>
                        </ToggleButton>
                    ) : (
                        <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                            <>
                                <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                                    <Box>
                                        <Typography variant="subtitle1">Resultado</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>{contarValoresTrue(values)}</Typography>
                                    </Box>
                                </Stack>
                            </>
                        </ToggleButton>
                    )}
                </ToggleButtonGroup>
            </MainCard>

            <Dialog
                maxWidth="xs"
                fullWidth
                open={openTeste}
                onClose={() => {
                    setOpenTeste(false);
                }}
            >
                <DialogTitle>Teste de Fechamento Auditivo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Durante a leitura de uma história, você será solicitado a identificar a figura correspondente. Esteja atento!
                    </DialogContentText>
                    <br />
                    <DialogContentText>Veja os exemplos antes de prosseguir</DialogContentText>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
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
                                            <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="error" />
                                            <Typography variant="subtitle1" textAlign="center">
                                                1. Que ignore o fim principal é ganhar
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <Divider />
                                    <CardContent>
                                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                                            <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="error" />
                                            <Typography variant="subtitle1" textAlign="center">
                                                2. A porta larga para ser mais rápido
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <Divider />
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenTeste(false);
                        }}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openExame}
                onClose={() => {
                    setOpenExame(false);
                }}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h3" textAlign="center">
                        Exame de Fechamento Auditivo
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <MainCard
                                title={
                                    <>
                                        <Typography variant="subtitle1" textAlign="center">
                                            Durante a leitura de uma história, você será solicitado a identificar a figura correspondente.
                                            Esteja atento!
                                        </Typography>
                                    </>
                                }
                                content={false}
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <MainCard title={'Escolha uma imagem'} content={false}>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={3}>
                                                        <Fab
                                                            color={
                                                                values.cs_figura_1 === true
                                                                    ? theme.palette.secondary.light
                                                                    : theme.palette.secondary.dark
                                                            }
                                                            //"info"
                                                            variant={values.cs_figura_1 === true ? 'contained' : 'outlined'}
                                                            aria-label="edit"
                                                            sx={{ width: 170, height: 170 }}
                                                            onClick={() => {
                                                                setFieldValue('cs_figura_1', !values.cs_figura_1);
                                                            }}
                                                        >
                                                            <Avatar
                                                                alt="Avatar 1"
                                                                // color="info"
                                                                src={`/assets/images/users/avatar-1.png`}
                                                                sx={{ width: 150, height: 150 }}
                                                            />
                                                        </Fab>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Fab
                                                            color={
                                                                values.cs_figura_1 === true
                                                                    ? theme.palette.secondary.light
                                                                    : theme.palette.secondary.dark
                                                            }
                                                            //"info"
                                                            variant={values.cs_figura_1 === true ? 'contained' : 'outlined'}
                                                            aria-label="edit"
                                                            sx={{ width: 170, height: 170 }}
                                                            onClick={() => {
                                                                setFieldValue('cs_figura_1', !values.cs_figura_1);
                                                            }}
                                                        >
                                                            <Avatar
                                                                alt="Avatar 1"
                                                                // color="info"
                                                                src={`/assets/images/users/avatar-1.png`}
                                                                sx={{ width: 150, height: 150 }}
                                                            />
                                                        </Fab>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </MainCard>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setOpenExame(false);
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            atualizar(values);
                            setOpenExame(false);
                        }}
                        type="submit"
                        disabled={isSubmitting}
                        startIcon={isSubmitting && <CircularProgress size={20} />}
                        variant="contained"
                        color="primary"
                    >
                        Concluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

FechamentoAuditivo1Form.propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string,
    state: PropTypes.string
};

FechamentoAuditivo1Form.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default FechamentoAuditivo1Form;

import { Box, Button, CircularProgress, Divider, FormGroup, Grid, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/ordenacao-temporal';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import { TextField } from '../../../../../node_modules/@mui/material/index';
import { FormattedMessage } from '../../../../../node_modules/react-intl/index';

const OrdenacaoTemporalForm = (props) => {
    const { initialValues, title } = props;

    const router = useRouter();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id } = router.query;

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            cs_recusa: Yup.boolean(),
            cs_n_1: Yup.boolean(),
            cs_n_2: Yup.boolean(),
            cs_n_3: Yup.boolean(),
            cs_n_4: Yup.boolean(),
            cs_n_5: Yup.boolean(),
            cs_n_6: Yup.boolean(),
            cs_i_1: Yup.boolean(),
            cs_i_2: Yup.boolean(),
            cs_i_3: Yup.boolean(),
            cs_i_4: Yup.boolean(),
            cs_i_5: Yup.boolean(),
            cs_i_6: Yup.boolean(),
            cs_r_n_1: Yup.boolean(),
            cs_r_n_2: Yup.boolean(),
            cs_r_n_3: Yup.boolean(),
            cs_r_n_4: Yup.boolean(),
            cs_r_n_5: Yup.boolean(),
            cs_r_n_6: Yup.boolean(),
            cs_r_i_1: Yup.boolean(),
            cs_r_i_2: Yup.boolean(),
            cs_r_i_3: Yup.boolean(),
            cs_r_i_4: Yup.boolean(),
            cs_r_i_5: Yup.boolean(),
            cs_r_i_6: Yup.boolean()
        })
        // , onSubmit: (values) => {
        //   try {
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
    });

    // eslint-disable-next-line no-unused-vars
    function contarValoresTrue(objeto) {
        let contador = 0;
        for (const chave in objeto) {
            if (chave.startsWith('cs_r_') && objeto[chave] === true) {
                contador++;
            }
        }
        return ((contador / 12) * 100).toFixed(2) + '%';
    }

    function contarNomeando() {
        const l1 = values.cs_n_1 === true && values.cs_r_n_1 === true ? 1 : 0;
        const l2 = values.cs_n_2 === true && values.cs_r_n_2 === true ? 1 : 0;
        const l3 = values.cs_n_3 === true && values.cs_r_n_3 === true ? 1 : 0;
        const l4 = values.cs_n_4 === true && values.cs_r_n_4 === true ? 1 : 0;
        const l5 = values.cs_n_5 === true && values.cs_r_n_5 === true ? 1 : 0;
        const l6 = values.cs_n_6 === true && values.cs_r_n_6 === true ? 1 : 0;
        return (((l1 + l2 + l3 + l4 + l5 + l6) / 6) * 100).toFixed(2) + '%';
    }

    function contarImitando() {
        const l1 = values.cs_i_1 === true && values.cs_r_i_1 === true ? 1 : 0;
        const l2 = values.cs_i_2 === true && values.cs_r_i_2 === true ? 1 : 0;
        const l3 = values.cs_i_3 === true && values.cs_r_i_3 === true ? 1 : 0;
        const l4 = values.cs_i_4 === true && values.cs_r_i_4 === true ? 1 : 0;
        const l5 = values.cs_i_5 === true && values.cs_r_i_5 === true ? 1 : 0;
        const l6 = values.cs_i_6 === true && values.cs_r_i_6 === true ? 1 : 0;
        return (((l1 + l2 + l3 + l4 + l5 + l6) / 6) * 100).toFixed(2) + '%';
    }

    const changeValue = (campo, valor) => {
        if (valor === 'true') {
            setFieldValue(campo, true);
        }

        if (valor === 'false') {
            setFieldValue(campo, false);
        }
    };

    const atualizar = (values) => {
        setSubmitting(true);
        dispatch(editar(values.id_ordenacao_temporal, values))
            .then(() => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Ordenação Temporal atualizada com sucesso!',
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

    const { values, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard
                        title={
                            <Typography variant="h3" color="textPrimary" gutterBottom>
                                Ordenação Temporal
                            </Typography>
                        }
                        content={false}
                        secondary={
                            <>
                                <FormControl>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="cs_recusa"
                                                    checked={Boolean(values.cs_recusa)}
                                                    value={Boolean(values.cs_recusa)}
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
                            <Typography variant="h5" color="textPrimary" gutterBottom>
                                Instruções para Aplicação
                            </Typography>
                            <Typography variant="body1">
                                Este exame avalia a habilidade do paciente em identificar e ordenar corretamente sons apresentados em
                                sequência. <br />
                                Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente. <br />
                                Clique em <strong>Iniciar</strong> para dar início à aplicação do exame com sequências sonoras a serem
                                ordenadas.
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
                            {values.cs_recusa === true ? (
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            id="ds_dicotico_digitos"
                                            name="ds_dicotico_digitos"
                                            label={<FormattedMessage id={'prontuario.cs_recusa'} />}
                                            fullWidth
                                            multiline
                                            minRows={2}
                                            maxRows={Infinity}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.ds_dicotico_digitos}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            fullWidth
                                            variant="shadow"
                                            color="secondary"
                                            type="submit"
                                            onClick={() => atualizar(values)}
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
                                    <ToggleButton value="web" aria-label="web" disableRipple>
                                        <Button variant="shadow" color="secondary" onClick={() => handleOpenTeste(true)}>
                                            Teste
                                        </Button>
                                    </ToggleButton>
                                    {values.cs_mosquito === null &&
                                    values.cs_tesoura === null &&
                                    values.cs_porta === null &&
                                    values.cs_sino === null &&
                                    values.cs_latido === null ? (
                                        <ToggleButton value="android" aria-label="android" disableRipple>
                                            <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                                                Iniciar
                                            </Button>
                                        </ToggleButton>
                                    ) : (
                                        <>
                                            <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                                                <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                                                    <Box>
                                                        <Typography variant="subtitle1">Resultado Nomeando</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography>{contarNomeando(values)}</Typography>
                                                    </Box>
                                                </Stack>
                                            </ToggleButton>
                                            <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                                                <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                                                    <Box>
                                                        <Typography variant="subtitle1">Resultado Imitando</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography>{contarImitando(values)}</Typography>
                                                    </Box>
                                                </Stack>
                                            </ToggleButton>
                                        </>
                                    )}
                                </ToggleButtonGroup>
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
                        <DialogTitle>Teste de Ordenação Temporal</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Você vai escutar uma sequência de 3 sons que pode variar entre grosso e fino.
                            </DialogContentText>
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
                                                    <AudioPlayerCircle
                                                        src="/assets/audios/pac/ordenacao-temporal/teste-1.mp3"
                                                        variant="contained"
                                                        color="error"
                                                    />
                                                    <Typography variant="subtitle1" textAlign="center">
                                                        GGF
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                            <Divider />
                                            <CardContent>
                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                                                    <AudioPlayerCircle
                                                        src="/assets/audios/pac/ordenacao-temporal/teste-2.mp3"
                                                        variant="contained"
                                                        color="error"
                                                    />
                                                    <Typography variant="subtitle1" textAlign="center">
                                                        GGF
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                            <Divider />
                                            <CardContent>
                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                                                    <AudioPlayerCircle
                                                        src="/assets/audios/pac/ordenacao-temporal/teste-3.mp3"
                                                        variant="contained"
                                                        color="error"
                                                    />
                                                    <Typography variant="subtitle1" textAlign="center">
                                                        FGF
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
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
                        maxWidth="lg"
                        fullWidth
                    >
                        <DialogTitle>
                            <Typography variant="h3" textAlign="center">
                                Exame de Ordenação Temporal
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <MainCard
                                        title={
                                            <>
                                                <Typography variant="subtitle1" textAlign="center">
                                                    Você vai escutar uma sequência de 3 sons que pode variar entre grosso e fino.
                                                </Typography>
                                                <Typography variant="subtitle1" textAlign="center">
                                                    Nomeando
                                                </Typography>
                                            </>
                                        }
                                        content={false}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>
                                                <MainCard
                                                    title={
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Play</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Som</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Reprodução</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Resposta</Typography>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    content={false}
                                                >
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-1.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">FFG</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_n_1 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_1', true);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_n_1 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_1', false);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_n_1}
                                                                        onChange={(e) => changeValue('cs_r_n_1', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />

                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-2.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">FGG</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_n_2 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_2', true);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_n_2 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_2', false);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_n_2}
                                                                        onChange={(e) => changeValue('cs_r_n_2', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-3.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">GFG</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_n_3 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_3', true);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_n_3 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_3', false);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_n_3}
                                                                        onChange={(e) => changeValue('cs_r_n_3', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-4.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">GFF</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_n_4 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_4', true);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_n_4 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_4', false);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_n_4}
                                                                        onChange={(e) => changeValue('cs_r_n_4', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-5.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">GFF</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_n_5 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_5', true);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_n_5 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_n_5', false);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_n_5}
                                                                        onChange={(e) => changeValue('cs_r_n_5', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    {/* <CardContent>
                            <Grid container spacing={3}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle
                                    src="/assets/audios/pac/ordenacao-temporal/audio-5.mp3"
                                    variant="contained"
                                    color="success"
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">GGF</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={6}>
                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                  <Button
                                    variant={values.cs_n_6 === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_n_6', true);
                                    }}
                                  >
                                    Nomeado
                                  </Button>
                                  <Button
                                    variant={values.cs_n_6 === false ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_n_6', false);
                                    }}
                                  >
                                    Imitado
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <RadioGroup
                                    name="radio-buttons-group"
                                    value={values.cs_r_n_6}
                                    onChange={(e) => changeValue('cs_r_n_6', e.target.value)}
                                    column
                                  >
                                    <FormControlLabel value={true} control={<Radio color="success" />} label="Passa" />
                                    <FormControlLabel value={false} control={<Radio color="error" />} label="Falha" />
                                  </RadioGroup>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent> */}
                                                </MainCard>
                                            </Grid>
                                        </Grid>
                                    </MainCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MainCard
                                        title={
                                            <>
                                                <Typography variant="subtitle1" textAlign="center">
                                                    Você vai escutar uma sequência de 3 sons que pode variar entre grosso e fino.
                                                </Typography>
                                                <Typography variant="subtitle1" textAlign="center">
                                                    Imitando
                                                </Typography>
                                            </>
                                        }
                                        content={false}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>
                                                <MainCard
                                                    title={
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Play</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Som</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Reprodução</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">Resposta</Typography>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    content={false}
                                                >
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-1.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">FFG</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_i_1 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_1', false);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_i_1 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_1', true);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_i_1}
                                                                        onChange={(e) => changeValue('cs_r_i_1', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />

                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-2.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">FGG</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_i_2 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_2', false);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_i_2 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_2', true);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_i_2}
                                                                        onChange={(e) => changeValue('cs_r_i_2', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-3.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">GFG</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_i_3 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_3', false);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_i_3 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_3', true);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_i_3}
                                                                        onChange={(e) => changeValue('cs_r_i_3', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-4.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">GFF</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_i_4 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_4', false);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_i_4 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_4', true);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_i_4}
                                                                        onChange={(e) => changeValue('cs_r_i_4', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
                                                    <CardContent>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <AudioPlayerCircle
                                                                        src="/assets/audios/pac/ordenacao-temporal/audio-5.mp3"
                                                                        variant="contained"
                                                                        color="success"
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <Typography variant="subtitle1">GFF</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                                    <Button
                                                                        variant={values.cs_i_5 === false ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_5', false);
                                                                        }}
                                                                    >
                                                                        Nomeado
                                                                    </Button>
                                                                    <Button
                                                                        variant={values.cs_i_5 === true ? 'contained' : 'outlined'}
                                                                        color="secondary"
                                                                        onClick={() => {
                                                                            setFieldValue('cs_i_5', true);
                                                                        }}
                                                                    >
                                                                        Imitado
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Stack direction="row" alignItems="center" justifyContent="center">
                                                                    <RadioGroup
                                                                        name="radio-buttons-group"
                                                                        value={values.cs_r_i_5}
                                                                        onChange={(e) => changeValue('cs_r_i_5', e.target.value)}
                                                                        column
                                                                    >
                                                                        <FormControlLabel
                                                                            value={true}
                                                                            control={<Radio color="success" />}
                                                                            label="Passa"
                                                                        />
                                                                        <FormControlLabel
                                                                            value={false}
                                                                            control={<Radio color="error" />}
                                                                            label="Falha"
                                                                        />
                                                                    </RadioGroup>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <Divider />
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
                                Salvar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Form>
            </FormikProvider>
        </Page>
    );
};

OrdenacaoTemporalForm.propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string,
    state: PropTypes.string
};

OrdenacaoTemporalForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default OrdenacaoTemporalForm;

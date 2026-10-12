import { Box, Button, CircularProgress, Divider, Fab, FormGroup, Grid, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import { editar } from 'store/reducers/dicotico-digitos';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import { TextField } from '../../../../../node_modules/@mui/material/index';
import { FormattedMessage } from '../../../../../node_modules/react-intl/index';
import DialogDicoticoDigitosTeste from './dialogs/dialog-dicotico-digitos-teste';

const DicoticoDigitosForm = (props) => {
  const { initialValues, title } = props;

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      cs_recusa: Yup.boolean(),
      cs_destro: Yup.boolean(),
      cs_canhoto: Yup.boolean(),
      cs_f_1_1: Yup.boolean(),
      cs_f_1_2: Yup.boolean(),
      cs_f_1_3: Yup.boolean(),
      cs_f_1_4: Yup.boolean(),
      cs_f_2_1: Yup.boolean(),
      cs_f_2_2: Yup.boolean(),
      cs_f_2_3: Yup.boolean(),
      cs_f_2_4: Yup.boolean(),
      cs_f_3_1: Yup.boolean(),
      cs_f_3_2: Yup.boolean(),
      cs_f_3_3: Yup.boolean(),
      cs_f_3_4: Yup.boolean(),
      cs_f_4_1: Yup.boolean(),
      cs_f_4_2: Yup.boolean(),
      cs_f_4_3: Yup.boolean(),
      cs_f_4_4: Yup.boolean(),
      cs_f_5_1: Yup.boolean(),
      cs_f_5_2: Yup.boolean(),
      cs_f_5_3: Yup.boolean(),
      cs_f_5_4: Yup.boolean(),
      cs_od_1_1: Yup.boolean(),
      cs_od_1_2: Yup.boolean(),
      cs_od_2_1: Yup.boolean(),
      cs_od_2_2: Yup.boolean(),
      cs_od_3_1: Yup.boolean(),
      cs_od_3_2: Yup.boolean(),
      cs_od_4_1: Yup.boolean(),
      cs_od_4_2: Yup.boolean(),
      cs_od_5_1: Yup.boolean(),
      cs_od_5_2: Yup.boolean(),
      cs_oe_1_1: Yup.boolean(),
      cs_oe_1_2: Yup.boolean(),
      cs_oe_2_1: Yup.boolean(),
      cs_oe_2_2: Yup.boolean(),
      cs_oe_3_1: Yup.boolean(),
      cs_oe_3_2: Yup.boolean(),
      cs_oe_4_1: Yup.boolean(),
      cs_oe_4_2: Yup.boolean(),
      cs_oe_5_1: Yup.boolean(),
      cs_oe_5_2: Yup.boolean()
    })
  });

  function resultadoLivre() {
    const l1 = contarValoresTrue4(values.cs_f_1_1, values.cs_f_1_2, values.cs_f_1_3, values.cs_f_1_4);
    const l2 = contarValoresTrue4(values.cs_f_2_1, values.cs_f_2_2, values.cs_f_2_3, values.cs_f_2_4);
    const l3 = contarValoresTrue4(values.cs_f_3_1, values.cs_f_3_2, values.cs_f_3_3, values.cs_f_3_4);
    const l4 = contarValoresTrue4(values.cs_f_4_1, values.cs_f_4_2, values.cs_f_4_3, values.cs_f_4_4);
    const l5 = contarValoresTrue4(values.cs_f_5_1, values.cs_f_5_2, values.cs_f_5_3, values.cs_f_5_4);

    return ((l1 + l2 + l3 + l4 + l5) / 5) * 100 + '%';
  }

  function resultadoDirigida() {
    const l1 = contarValoresTrue2(
      values.cs_destro,
      values.cs_canhoto,
      values.cs_od_1_1,
      values.cs_od_1_2,
      values.cs_oe_1_1,
      values.cs_oe_1_2
    );
    const l2 = contarValoresTrue2(
      values.cs_destro,
      values.cs_canhoto,
      values.cs_od_2_1,
      values.cs_od_2_2,
      values.cs_oe_2_1,
      values.cs_oe_2_2
    );
    const l3 = contarValoresTrue2(
      values.cs_destro,
      values.cs_canhoto,
      values.cs_od_3_1,
      values.cs_od_3_2,
      values.cs_oe_3_1,
      values.cs_oe_3_2
    );
    const l4 = contarValoresTrue2(
      values.cs_destro,
      values.cs_canhoto,
      values.cs_od_4_1,
      values.cs_od_4_2,
      values.cs_oe_4_1,
      values.cs_oe_4_2
    );
    const l5 = contarValoresTrue2(
      values.cs_destro,
      values.cs_canhoto,
      values.cs_od_5_1,
      values.cs_od_5_2,
      values.cs_oe_5_1,
      values.cs_oe_5_2
    );

    return ((l1 + l2 + l3 + l4 + l5) / 5) * 100 + '%';
  }

  function contarValoresTrue4(campo1, campo2, campo3, campo4) {
    let objeto = {
      col1: campo1,
      col2: campo2,
      col3: campo3,
      col4: campo4
    };
    let contagem = 0;
    for (let chave in objeto) {
      if (objeto[chave] === true) {
        contagem++;
      }
    }
    return contagem == 4 ? 1 : 0;
  }

  function contarValoresTrue2(od, oe, campo1, campo2, campo3, campo4) {
    let objeto = {
      od: od,
      oe: oe,
      od_1: campo1,
      od_2: campo2,
      oe_1: campo3,
      oe_2: campo4
    };

    let contagemOd = 0;
    let contagemOe = 0;

    // Verifica os atributos relacionados a "od"
    if (objeto?.od === true) {
      if (objeto?.od_1 === true) contagemOd++;
      if (objeto?.od_2 === true) contagemOd++;
    }

    // Verifica os atributos relacionados a "oe"
    if (objeto?.oe === true) {
      if (objeto?.oe_1 === true) contagemOe++;
      if (objeto?.oe_2 === true) contagemOe++;
    }

    let total = contagemOd + contagemOe;
    return total == 2 ? 1 : 0;
  }

  const atualizar = (values) => {
    setSubmitting(true);
    dispatch(editar(values.id_dicotico_digitos, values))
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Dicótico de dígitos atualizado com sucesso!',
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
                Dicótico Dígitos
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
                Este exame avalia a habilidade do paciente em reconhecer e repetir números apresentados simultaneamente em ambos os ouvidos.{' '}
                <br />
                Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente. <br />
                Clique em <strong>Iniciar</strong> para começar a aplicação com os estímulos auditivos.
              </Typography>
            </CardContent>
            <Divider />
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
                      <>
                        <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                          <Box>
                            <Typography variant="subtitle1">Resultado Livre</Typography>
                          </Box>
                          <Box>
                            <Typography>{resultadoLivre()}</Typography>
                          </Box>
                        </Stack>
                      </>
                    </ToggleButton>
                    <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                      <>
                        <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                          <Box>
                            <Typography variant="subtitle1">Resultado Dirigida</Typography>
                          </Box>
                          <Box>
                            <Typography>{resultadoDirigida()}</Typography>
                          </Box>
                        </Stack>
                      </>
                    </ToggleButton>
                  </>
                )}
              </ToggleButtonGroup>
            )}
            {/* {values.cs_recusa === true ? (
                <ToggleButton value="android" aria-label="android" disableRipple>
                  <Button variant="shadow" color="secondary" onClick={() => atualizar(values)}>
                    Salvar Recusa
                  </Button>
                </ToggleButton>
              ) : values.cs_destro === null && values.cs_canhoto === null ? (
                <ToggleButton value="android" aria-label="android" disableRipple>
                  <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                    Iniciar
                  </Button>
                </ToggleButton>
              ) : (
                ''
              )} */}
          </MainCard>

          <DialogDicoticoDigitosTeste open={openTeste} setOpen={setOpenTeste} initialValues={[]} />

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
                Exame de Dicótico Dígitos
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="subtitle1" textAlign="center">
                          Você ouvirá 4 números, sendo que 2 deles serão falados no ouvido direito e 2 deles no ouvido esquerdo, ao mesmo
                          tempo !
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                          Ouça os números e repita em voz alta:
                        </Typography>
                      </>
                    }
                    content={false}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={2}>
                        <MainCard
                          title={
                            <Typography variant="subtitle1" textAlign="center">
                              Play
                            </Typography>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle
                                src="/assets/audios/pac/dicotico-digitos/audio-1.mp3"
                                variant="contained"
                                color="success"
                              />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle
                                src="/assets/audios/pac/dicotico-digitos/audio-2.mp3"
                                variant="contained"
                                color="success"
                              />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle
                                src="/assets/audios/pac/dicotico-digitos/audio-3.mp3"
                                variant="contained"
                                color="success"
                              />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle
                                src="/assets/audios/pac/dicotico-digitos/audio-4.mp3"
                                variant="contained"
                                color="success"
                              />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle
                                src="/assets/audios/pac/dicotico-digitos/audio-5.mp3"
                                variant="contained"
                                color="success"
                              />
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MainCard
                          title={
                            <Typography variant="subtitle1" textAlign="center">
                              OD
                            </Typography>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_1_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_1_1', !values.cs_f_1_1);
                                }}
                              >
                                5
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_1_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_1_2', !values.cs_f_1_2);
                                }}
                              >
                                4
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_2_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_2_1', !values.cs_f_2_1);
                                }}
                              >
                                4
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_2_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_2_2', !values.cs_f_2_2);
                                }}
                              >
                                8
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_3_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_3_1', !values.cs_f_3_1);
                                }}
                              >
                                5
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_3_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_3_2', !values.cs_f_3_2);
                                }}
                              >
                                9
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_4_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_4_1', !values.cs_f_4_1);
                                }}
                              >
                                7
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_4_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_4_2', !values.cs_f_4_2);
                                }}
                              >
                                4
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_5_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_5_1', !values.cs_f_5_1);
                                }}
                              >
                                9
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_5_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_f_5_2', !values.cs_f_5_2);
                                }}
                              >
                                8
                              </Fab>
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MainCard
                          title={
                            <Typography variant="subtitle1" textAlign="center">
                              OE
                            </Typography>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_1_3 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_1_3', !values.cs_f_1_3);
                                }}
                              >
                                8
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_1_4 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_1_4', !values.cs_f_1_4);
                                }}
                              >
                                7
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_2_3 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_2_3', !values.cs_f_2_3);
                                }}
                              >
                                9
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_2_4 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_2_4', !values.cs_f_2_4);
                                }}
                              >
                                7
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_3_3 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_3_3', !values.cs_f_3_3);
                                }}
                              >
                                8
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_3_4 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_3_4', !values.cs_f_3_4);
                                }}
                              >
                                4
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_4_3 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_4_3', !values.cs_f_4_3);
                                }}
                              >
                                5
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_4_4 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_4_4', !values.cs_f_4_4);
                                }}
                              >
                                9
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_f_5_3 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_5_3', !values.cs_f_5_3);
                                }}
                              >
                                7
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_f_5_4 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_f_5_4', !values.cs_f_5_4);
                                }}
                              >
                                5
                              </Fab>
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <MainCard
                          title={
                            <Typography variant="subtitle1" textAlign="center">
                              Acertos
                            </Typography>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue4(values.cs_f_1_1, values.cs_f_1_2, values.cs_f_1_3, values.cs_f_1_4)}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue4(values.cs_f_2_1, values.cs_f_2_2, values.cs_f_2_3, values.cs_f_2_4)}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue4(values.cs_f_3_1, values.cs_f_3_2, values.cs_f_3_3, values.cs_f_3_4)}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue4(values.cs_f_4_1, values.cs_f_4_2, values.cs_f_4_3, values.cs_f_4_4)}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue4(values.cs_f_5_1, values.cs_f_5_2, values.cs_f_5_3, values.cs_f_5_4)}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="subtitle1" textAlign="center">
                          Repita apenas os números que escutou em:
                        </Typography>
                      </>
                    }
                    content={false}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={2}>
                        <MainCard
                          title={
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <Typography variant="subtitle1" textAlign="center">
                                Play
                              </Typography>
                            </Stack>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MainCard
                          title={
                            <Button
                              variant={values.cs_destro === true ? 'contained' : null}
                              color="secondary"
                              fullWidth
                              onClick={() => {
                                setFieldValue('cs_destro', !values.cs_destro);
                              }}
                            >
                              <Typography variant="subtitle1" textAlign="center">
                                OD - Se for destro
                              </Typography>
                            </Button>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_od_1_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_1_1', !values.cs_od_1_1);
                                }}
                              >
                                5
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_od_1_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_1_2', !values.cs_od_1_2);
                                }}
                              >
                                4
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_od_2_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_2_1', !values.cs_od_2_1);
                                }}
                              >
                                4
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_od_2_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_2_2', !values.cs_od_2_2);
                                }}
                              >
                                8
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_od_3_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_3_1', !values.cs_od_3_1);
                                }}
                              >
                                5
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_od_3_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_3_2', !values.cs_od_3_2);
                                }}
                              >
                                9
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_od_4_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_4_1', !values.cs_od_4_1);
                                }}
                              >
                                7
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_od_4_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_4_2', !values.cs_od_4_2);
                                }}
                              >
                                4
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_od_5_1 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_5_1', !values.cs_od_5_1);
                                }}
                              >
                                9
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_od_5_2 === true ? 'secondary' : 'error'}
                                onClick={() => {
                                  setFieldValue('cs_od_5_2', !values.cs_od_5_2);
                                }}
                              >
                                8
                              </Fab>
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MainCard
                          title={
                            <Button
                              color="secondary"
                              fullWidth
                              variant={values.cs_canhoto === true ? 'contained' : null}
                              onClick={() => {
                                setFieldValue('cs_canhoto', !values.cs_canhoto);
                              }}
                            >
                              <Typography variant="subtitle1" textAlign="center">
                                OE - se for canhoto
                              </Typography>
                            </Button>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_oe_1_1 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_1_1', !values.cs_oe_1_1);
                                }}
                              >
                                8
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_oe_1_2 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_1_2', !values.cs_oe_1_2);
                                }}
                              >
                                7
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_oe_2_1 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_2_1', !values.cs_oe_2_1);
                                }}
                              >
                                9
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_oe_2_2 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_2_2', !values.cs_oe_2_2);
                                }}
                              >
                                7
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_oe_3_1 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_3_1', !values.cs_oe_3_1);
                                }}
                              >
                                8
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_oe_3_2 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_3_2', !values.cs_oe_3_2);
                                }}
                              >
                                4
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_oe_4_1 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_4_1', !values.cs_oe_4_1);
                                }}
                              >
                                5
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_oe_4_2 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_4_2', !values.cs_oe_4_2);
                                }}
                              >
                                9
                              </Fab>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                              <Fab
                                variant="contained"
                                color={values.cs_oe_5_1 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_5_1', !values.cs_oe_5_1);
                                }}
                              >
                                7
                              </Fab>
                              <Fab
                                variant="contained"
                                color={values.cs_oe_5_2 === true ? 'secondary' : 'primary'}
                                onClick={() => {
                                  setFieldValue('cs_oe_5_2', !values.cs_oe_5_2);
                                }}
                              >
                                5
                              </Fab>
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <MainCard
                          title={
                            <Typography variant="subtitle1" textAlign="center">
                              Acertos
                            </Typography>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue2(
                                  values.cs_destro,
                                  values.cs_canhoto,
                                  values.cs_od_1_1,
                                  values.cs_od_1_2,
                                  values.cs_oe_1_1,
                                  values.cs_oe_1_2
                                )}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue2(
                                  values.cs_destro,
                                  values.cs_canhoto,
                                  values.cs_od_2_1,
                                  values.cs_od_2_2,
                                  values.cs_oe_2_1,
                                  values.cs_oe_2_2
                                )}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue2(
                                  values.cs_destro,
                                  values.cs_canhoto,
                                  values.cs_od_3_1,
                                  values.cs_od_3_2,
                                  values.cs_oe_3_1,
                                  values.cs_oe_3_2
                                )}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue2(
                                  values.cs_destro,
                                  values.cs_canhoto,
                                  values.cs_od_4_1,
                                  values.cs_od_4_2,
                                  values.cs_oe_4_1,
                                  values.cs_oe_4_2
                                )}
                              </Typography>
                            </Stack>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 2, pb: 2 }}>
                              <Typography variant="subtitle1" textAlign="center">
                                {contarValoresTrue2(
                                  values.cs_destro,
                                  values.cs_canhoto,
                                  values.cs_od_5_1,
                                  values.cs_od_5_2,
                                  values.cs_oe_5_1,
                                  values.cs_oe_5_2
                                )}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid> */}
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

DicoticoDigitosForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

DicoticoDigitosForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DicoticoDigitosForm;

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
import { editar } from 'store/reducers/dicotico-sequencial';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import { TextField } from '../../../../../node_modules/@mui/material/index';
import { FormattedMessage } from '../../../../../node_modules/react-intl/index';

const DicoticoSequencialForm = (props) => {
  const { initialValues, title } = props;

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      cs_recusa: Yup.boolean(),
      cs_l_2_a: Yup.boolean(),
      cs_l_1_a: Yup.boolean(),
      cs_l_3_a: Yup.boolean(),
      cs_l_4_a: Yup.boolean(),
      cs_l_5_a: Yup.boolean(),
      cs_l_1_b: Yup.boolean(),
      cs_l_2_b: Yup.boolean(),
      cs_l_3_b: Yup.boolean(),
      cs_l_4_b: Yup.boolean(),
      cs_l_5_b: Yup.boolean(),
      cs_l_1_c: Yup.boolean(),
      cs_l_2_c: Yup.boolean(),
      cs_l_3_c: Yup.boolean(),
      cs_l_4_c: Yup.boolean(),
      cs_l_5_c: Yup.boolean(),
      cs_l_1_d: Yup.boolean(),
      cs_l_2_d: Yup.boolean(),
      cs_l_3_d: Yup.boolean(),
      cs_l_4_d: Yup.boolean(),
      cs_l_5_d: Yup.boolean(),
      cs_l_1_e: Yup.boolean(),
      cs_l_2_e: Yup.boolean(),
      cs_l_3_e: Yup.boolean(),
      cs_l_4_e: Yup.boolean(),
      cs_l_5_e: Yup.boolean(),
      cs_l_1_f: Yup.boolean(),
      cs_l_2_f: Yup.boolean(),
      cs_l_3_f: Yup.boolean(),
      cs_l_4_f: Yup.boolean(),
      cs_l_5_f: Yup.boolean(),
      cs_l_1_g: Yup.boolean(),
      cs_l_2_g: Yup.boolean(),
      cs_l_3_g: Yup.boolean(),
      cs_l_4_g: Yup.boolean(),
      cs_l_5_g: Yup.boolean(),
      cs_l_1_h: Yup.boolean(),
      cs_l_2_h: Yup.boolean(),
      cs_l_3_h: Yup.boolean(),
      cs_l_4_h: Yup.boolean(),
      cs_l_5_h: Yup.boolean()
    })
    // , onSubmit: (values) => {
    //   try {
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  });

  function contarValoresTrue(objeto) {
    let contador = 0;
    for (const chave in objeto) {
      if (chave.startsWith('cs_l_') && objeto[chave] === true) {
        contador++;
      }
    }
    return ((contador / 40) * 100).toFixed(2) + '%';
  }

  function contarValoresFalse(ends, objeto) {
    let contador = 0;
    for (const chave in objeto) {
      if (chave.endsWith(ends) && objeto[chave] === false) {
        contador++;
      }
    }
    // return ((contador / 5) * 100).toFixed(2) + '%';
    return contador;
  }

  const atualizar = (values) => {
    setSubmitting(true);
    dispatch(editar(values.id_dicotico_sequencial, values))
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Dicotico Sequencial atualizado com sucesso!',
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
            title="Dicótico Sequencial"
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
                Este exame avalia a capacidade do paciente de reconhecer estímulos auditivos apresentados de forma alternada entre os
                ouvidos. <br />
                Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente. <br />
                Clique em <strong>Iniciar</strong> para dar início à aplicação do exame com estímulos dicóticos apresentados
                sequencialmente.
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
                {values.cs_l_1_a === false &&
                values.cs_l_1_b === false &&
                values.cs_l_1_c === false &&
                values.cs_l_1_d === false &&
                values.cs_l_1_e === false &&
                values.cs_l_1_f === false &&
                values.cs_l_1_g === false ? (
                  <ToggleButton value="android" aria-label="android" disableRipple>
                    <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                      Iniciar
                    </Button>
                  </ToggleButton>
                ) : (
                  <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                    <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                      <Box>
                        <Typography variant="subtitle1">Resultado</Typography>
                      </Box>
                      <Box>
                        <Typography>{contarValoresTrue(values)}</Typography>
                      </Box>
                    </Stack>
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            )}
            {/* <ToggleButtonGroup
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
              ) : values.cs_l_1_a === false &&
                values.cs_l_1_b === false &&
                values.cs_l_1_c === false &&
                values.cs_l_1_d === false &&
                values.cs_l_1_e === false &&
                values.cs_l_1_f === false &&
                values.cs_l_1_g === false ? (
                <ToggleButton value="android" aria-label="android" disableRipple>
                  <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                    Iniciar
                  </Button>
                </ToggleButton>
              ) : (
                <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                  <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                    <Box>
                      <Typography variant="subtitle1">Resultado</Typography>
                    </Box>
                    <Box>
                      <Typography>{contarValoresTrue(values)}</Typography>
                    </Box>
                  </Stack>
                </ToggleButton>
              )}
            </ToggleButtonGroup> */}
          </MainCard>

          <Dialog
            maxWidth="lg"
            fullWidth
            open={openTeste}
            onClose={() => {
              setOpenTeste(false);
            }}
          >
            <DialogTitle>Teste de Dicotico Sequencial</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Serão ditas quatro palavras, duas de cada lado. Algumas palavras serão ditas simultaneamente. Repita as palavras que você
                ouvir, na mesma ordem em que foram ditas.
              </DialogContentText>
              <Grid container spacing={3} sm={12}>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <Typography variant="subtitle1" textAlign="center">
                        Ouça os exemplos antes de prosseguir:
                      </Typography>
                    }
                    content={false}
                  >
                    <CardContent>
                      <Grid container spacing={3} sm={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">A</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">B</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">C</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">D</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">E</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">F</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">G</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">H</Typography>
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
                              src="/assets/audios/pac/dicotico-sequencial/teste-1.mp3"
                              variant="contained"
                              color="success"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_a === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_a', !values.cs_t_1_a);
                              }}
                            >
                              Porta
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_b === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_b', !values.cs_t_1_b);
                              }}
                            >
                              Lápis
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_c === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_c', !values.cs_t_1_c);
                              }}
                            >
                              Bela
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_d === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_d', !values.cs_t_1_d);
                              }}
                            >
                              Joia
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_e === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_e', !values.cs_t_1_e);
                              }}
                            >
                              Ovo
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_f === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_f', !values.cs_t_1_f);
                              }}
                            >
                              Mole
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_g === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_g', !values.cs_t_1_g);
                              }}
                            >
                              Peixe
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="space-around">
                            <Button
                              variant={values.cs_t_1_h === true ? 'contained' : 'outlined'}
                              color="secondary"
                              onClick={() => {
                                setFieldValue('cs_t_1_h', !values.cs_t_1_h);
                              }}
                            >
                              Fresco
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </Grid>
              </Grid>
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
                Exame de Dicotico Sequencial
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="subtitle1" textAlign="left">
                          Serão ditas quatro palavras, duas de cada lado.
                        </Typography>
                        <Typography variant="subtitle1" textAlign="left">
                          Algumas palavras serão ditas simultaneamente.
                        </Typography>
                        <Typography variant="subtitle1" textAlign="left">
                          Repita as palavras que você ouvir, na mesma ordem em que foram ditas.
                        </Typography>
                      </>
                    }
                    content={false}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        <MainCard
                          title={
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center"></Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">A</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">B</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">C</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">D</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">E</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">F</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">G</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">H</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">Play</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">DNC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">DC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">EC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">ENC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">ENC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">EC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">DC</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">DNC</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle
                                    src="/assets/audios/pac/dicotico-sequencial/audio-1.mp3"
                                    variant="contained"
                                    color="success"
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_a === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_a', !values.cs_l_1_a);
                                    }}
                                  >
                                    Bota
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_b === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_b', !values.cs_l_1_b);
                                    }}
                                  >
                                    Fora
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_c === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_c', !values.cs_l_1_c);
                                    }}
                                  >
                                    Pega
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_d === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_d', !values.cs_l_1_d);
                                    }}
                                  >
                                    Fogo
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_e === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_e', !values.cs_l_1_e);
                                    }}
                                  >
                                    Noite
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_f === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_f', !values.cs_l_1_f);
                                    }}
                                  >
                                    Negra
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_g === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_g', !values.cs_l_1_g);
                                    }}
                                  >
                                    Sala
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_1_h === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_1_h', !values.cs_l_1_h);
                                    }}
                                  >
                                    Clara
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle
                                    src="/assets/audios/pac/dicotico-sequencial/audio-2.mp3"
                                    variant="contained"
                                    color="success"
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_a === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_a', !values.cs_l_2_a);
                                    }}
                                  >
                                    Cara
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_b === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_b', !values.cs_l_2_b);
                                    }}
                                  >
                                    Vela
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_c === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_c', !values.cs_l_2_c);
                                    }}
                                  >
                                    Roupa
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_d === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_d', !values.cs_l_2_d);
                                    }}
                                  >
                                    Suja
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_e === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_e', !values.cs_l_2_e);
                                    }}
                                  >
                                    Minha
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_f === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_f', !values.cs_l_2_f);
                                    }}
                                  >
                                    Nora
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_g === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_g', !values.cs_l_2_g);
                                    }}
                                  >
                                    Nossa
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_2_h === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_2_h', !values.cs_l_2_h);
                                    }}
                                  >
                                    Filha
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle
                                    src="/assets/audios/pac/dicotico-sequencial/audio-3.mp3"
                                    variant="contained"
                                    color="success"
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_a === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_a', !values.cs_l_3_a);
                                    }}
                                  >
                                    Água
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_b === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_b', !values.cs_l_3_b);
                                    }}
                                  >
                                    Limpa
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_c === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_c', !values.cs_l_3_c);
                                    }}
                                  >
                                    Tarde
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_d === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_d', !values.cs_l_3_d);
                                    }}
                                  >
                                    Fresca
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_e === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_e', !values.cs_l_3_e);
                                    }}
                                  >
                                    Vaga
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_f === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_f', !values.cs_l_3_f);
                                    }}
                                  >
                                    Lume
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_g === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_g', !values.cs_l_3_g);
                                    }}
                                  >
                                    Mori
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_3_h === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_3_h', !values.cs_l_3_h);
                                    }}
                                  >
                                    Bundo
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle
                                    src="/assets/audios/pac/dicotico-sequencial/audio-4.mp3"
                                    variant="contained"
                                    color="success"
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_a === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_a', !values.cs_l_4_a);
                                    }}
                                  >
                                    Joga
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_b === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_b', !values.cs_l_4_b);
                                    }}
                                  >
                                    Fora
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_c === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_c', !values.cs_l_4_c);
                                    }}
                                  >
                                    Chuta
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_d === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_d', !values.cs_l_4_d);
                                    }}
                                  >
                                    Bola
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_e === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_e', !values.cs_l_4_e);
                                    }}
                                  >
                                    Cerca
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_f === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_f', !values.cs_l_4_f);
                                    }}
                                  >
                                    Viva
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_g === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_g', !values.cs_l_4_g);
                                    }}
                                  >
                                    Milho
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_4_h === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_4_h', !values.cs_l_4_h);
                                    }}
                                  >
                                    Verde
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle
                                    src="/assets/audios/pac/dicotico-sequencial/audio-5.mp3"
                                    variant="contained"
                                    color="success"
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_a === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_a', !values.cs_l_5_a);
                                    }}
                                  >
                                    Ponto
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_b === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_b', !values.cs_l_5_b);
                                    }}
                                  >
                                    Morto
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_c === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_c', !values.cs_l_5_c);
                                    }}
                                  >
                                    Vento
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_d === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_d', !values.cs_l_5_d);
                                    }}
                                  >
                                    Fraco
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_e === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_e', !values.cs_l_5_e);
                                    }}
                                  >
                                    Bola
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_f === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_f', !values.cs_l_5_f);
                                    }}
                                  >
                                    Grande
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_g === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_g', !values.cs_l_5_g);
                                    }}
                                  >
                                    Rosa
                                  </Button>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant={values.cs_l_5_h === true ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => {
                                      setFieldValue('cs_l_5_h', !values.cs_l_5_h);
                                    }}
                                  >
                                    Murcha
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                          </CardContent>
                          <Divider />
                          <CardContent>
                            <Grid container spacing={10}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">Erros</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_a', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_b', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_c', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_d', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_e', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_f', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_g', values)}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={1}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography>{contarValoresFalse('_h', values)}</Typography>
                                </Stack>
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
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </FormikProvider>
    </Page>
  );
};

DicoticoSequencialForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

DicoticoSequencialForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DicoticoSequencialForm;

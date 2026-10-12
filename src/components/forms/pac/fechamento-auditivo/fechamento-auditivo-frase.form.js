import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
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
import Page from 'components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/fechamento-auditivo';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import { TextField } from '../../../../../node_modules/@mui/material/index';
import { FormattedMessage } from '../../../../../node_modules/react-intl/index';

const FechamentoAuditivoFraseForm = (props) => {
  const { initialValues, title } = props;

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      cs_recusa: Yup.boolean(),
      cs_frase_1: Yup.boolean(),
      cs_frase_2: Yup.boolean(),
      cs_frase_3: Yup.boolean(),
      cs_frase_4: Yup.boolean(),
      cs_frase_5: Yup.boolean(),
      cs_frase_6: Yup.boolean(),
      cs_frase_7: Yup.boolean(),
      cs_frase_8: Yup.boolean(),
      cs_frase_9: Yup.boolean(),
      cs_frase_10: Yup.boolean()
    })
    // ,onSubmit: (values) => {
    //   try {
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  });

  function contarValoresTrue(objeto) {
    let contador = 0;
    for (const chave in objeto) {
      if (chave.startsWith('cs_frase_') && objeto[chave] === true) {
        contador++;
      }
    }
    return ((contador / 10) * 100).toFixed(2) + '%';
  }

  const atualizar = (values) => {
    setSubmitting(true);
    dispatch(editar(values.id_fechamento_auditivo, values))
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Localização Sonora atualizada com sucesso!',
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
            title="Fechamento Auditivo Frase"
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
                Este exame avalia a habilidade do paciente em compreender frases mesmo com interferência de ruído. <br />
                Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente. <br />
                Clique em <strong>Iniciar</strong> para dar início à aplicação do exame com frases parcialmente mascaradas por ruído.
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
                {values.cs_frase_1 === false &&
                values.cs_frase_2 === false &&
                values.cs_frase_3 === false &&
                values.cs_frase_4 === false ? (
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
            </ToggleButtonGroup> */}
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
                      <Typography variant="subtitle1" textAlign="center">
                        Durante a leitura de uma história, você será solicitado a identificar a figura correspondente. Esteja atento!
                      </Typography>
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

                              <Grid item xs={10}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">Frases</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                                </Stack>
                              </Grid>
                              <Grid item xs={5}>
                                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                  <Grid item>
                                    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                                      <Button
                                        variant={values.cs_frase_1 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        onClick={() => {
                                          setFieldValue('cs_frase_1', !values.cs_frase_1);
                                        }}
                                      >
                                        <Typography variant="h6" textAlign="left">
                                          1. Que ignore o fim principal é ganhar
                                        </Typography>
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_2 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_2', !values.cs_frase_2);
                                        }}
                                      >
                                        2. A porta larga para ser mais rápido
                                      </Button>

                                      <Button
                                        variant={values.cs_frase_3 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_3', !values.cs_frase_3);
                                        }}
                                      >
                                        3. Gosta muito crer te dá muito para
                                      </Button>

                                      <Button
                                        variant={values.cs_frase_4 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_4', !values.cs_frase_4);
                                        }}
                                      >
                                        4. Quarto golpe de estado e o campo
                                      </Button>

                                      <Button
                                        variant={values.cs_frase_5 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_5', !values.cs_frase_5);
                                        }}
                                      >
                                        5. Sempre e corre muito mais bonito que
                                      </Button>
                                    </ButtonGroup>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={5}>
                                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                  <Grid item>
                                    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                                      <Button
                                        variant={values.cs_frase_6 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_6', !values.cs_frase_6);
                                        }}
                                      >
                                        6. Confiança em minha alma cai dentro de
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_7 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_7', !values.cs_frase_7);
                                        }}
                                      >
                                        7. Ação humilde é bem claro o céu
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_8 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_8', !values.cs_frase_8);
                                        }}
                                      >
                                        8. Sobre minha cabeça está de Deus pai
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_9 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_9', !values.cs_frase_9);
                                        }}
                                      >
                                        9. Grande general chega já e não creias
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_10 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_10', !values.cs_frase_10);
                                        }}
                                      >
                                        10. Assista a aula de papel branco na
                                      </Button>
                                    </ButtonGroup>
                                  </Grid>
                                </Grid>
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
        </Form>
      </FormikProvider>
    </Page>
  );
};

FechamentoAuditivoFraseForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

FechamentoAuditivoFraseForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default FechamentoAuditivoFraseForm;

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Switch,
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
import { getId } from 'store/reducers/prontuario';
import { editar } from 'store/reducers/resolucao-temporal';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import { TextField } from '../../../../../node_modules/@mui/material/index';
import { FormattedMessage } from '../../../../../node_modules/react-intl/index';

const ResolucaoTemporalForm = (props) => {
  const { initialValues, title } = props;

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      cs_recusa: Yup.boolean(),
      cs_frequencia: Yup.boolean(),
      cs_0: Yup.boolean(),
      cs_2: Yup.boolean(),
      cs_5: Yup.boolean(),
      cs_10: Yup.boolean(),
      cs_15: Yup.boolean(),
      cs_20: Yup.boolean(),
      cs_25: Yup.boolean(),
      cs_30: Yup.boolean(),
      cs_40: Yup.boolean()
    }),
    onSubmit: () => {
      try {
      } catch (error) {
        console.error(error);
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  function contarValoresTrue(objeto) {
    let contador = 0;
    for (const chave in objeto) {
      if (chave.startsWith('cs_l_') && objeto[chave] === true) {
        contador++;
      }
    }
    return ((contador / 40) * 100).toFixed(2) + '%';
  }

  const changeValue = (campo, valor) => {
    if (valor === 'true') {
      setFieldValue(campo, true);
    }

    if (valor === 'false') {
      setFieldValue(campo, false);
    }
  };

  const resultado = (objeto) => {
    if (!objeto) {
      return '';
    }

    // Filtrar as chaves do objeto que começam com "cs_" e têm o valor igual a true,
    // excluindo as chaves "cs_0", "cs_recusa", e "cs_frequencia"
    const camposCsTrue = Object.keys(objeto)
      .filter((chave) => chave.startsWith('cs_') && !['cs_0', 'cs_recusa', 'cs_frequencia'].includes(chave) && objeto[chave] === true)
      .map((chave) => parseInt(chave.replace('cs_', ''), 10)); // Converter para números inteiros

    // Encontrar o menor valor entre os campos encontrados
    const menorCsTrue = camposCsTrue.length > 0 ? Math.min(...camposCsTrue) : null;

    return menorCsTrue !== null ? menorCsTrue : '';
  };

  const atualizar = (values) => {
    setSubmitting(true);
    dispatch(editar(values.id_resolucao_temporal, values))
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Resolução Temporal atualizado com sucesso!',
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

  const { values, handleSubmit, handleChange, handleBlur, isSubmitting, setSubmitting, setFieldValue } = formik;

  return (
    <Page title={title}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <MainCard
            title="Resolução Temporal"
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
                Este exame avalia a habilidade do paciente em perceber pequenas diferenças de tempo entre sons breves. <br />
                Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente. <br />
                Clique em <strong>Iniciar</strong> para dar início à aplicação do exame com pares de sons breves para discriminação
                temporal.
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
                {values.cs_0 === null &&
                values.cs_2 === null &&
                values.cs_5 === null &&
                values.cs_10 === null &&
                values.cs_15 === null &&
                values.cs_20 === null &&
                values.cs_25 === null &&
                values.cs_30 === null &&
                values.cs_40 === null ? (
                  <ToggleButton value="android" aria-label="android" disableRipple>
                    <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                      Iniciar
                    </Button>
                  </ToggleButton>
                ) : (
                  <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                    <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                      <Box>
                        <Typography variant="subtitle1">Menor Gap</Typography>
                      </Box>
                      <Box>
                        <Typography>{resultado(values)}</Typography>
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
              ) : values.cs_0 === null &&
                values.cs_2 === null &&
                values.cs_5 === null &&
                values.cs_10 === null &&
                values.cs_15 === null &&
                values.cs_20 === null &&
                values.cs_25 === null &&
                values.cs_30 === null &&
                values.cs_40 === null ? (
                <ToggleButton value="android" aria-label="android" disableRipple>
                  <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                    Iniciar
                  </Button>
                </ToggleButton>
              ) : (
                <ToggleButton value="ios" aria-label="ios" disableRipple onClick={() => handleOpenExame(true)}>
                  <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                    <Box>
                      <Typography variant="subtitle1">Menor Gap</Typography>
                    </Box>
                    <Box>
                      <Typography>{resultado(values)}</Typography>
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
            <DialogTitle>Teste de Resolução Temporal</DialogTitle>
            <DialogContent>
              <DialogContentText>Ouça o áudio e indique se ouviu 1 apito ou 2 apitos.</DialogContentText>
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
                        <Grid item xs={2}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">500kHz</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">30</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">10</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">15</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">2</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">0</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">40</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">5</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">20</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">25</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">Menor</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3} sm={12}>
                        <Grid item xs={2}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <AudioPlayerCircle
                              src="/assets/audios/pac/resolucao-temporal/teste-1.mp3"
                              variant="contained"
                              color="success"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_30}
                                onChange={(e) => {
                                  changeValue('cs_t_30', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_10}
                                onChange={(e) => {
                                  changeValue('cs_t_10', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_15}
                                onChange={(e) => {
                                  changeValue('cs_t_15', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_2}
                                onChange={(e) => {
                                  changeValue('cs_t_2', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_0}
                                onChange={(e) => {
                                  changeValue('cs_t_0', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_40}
                                onChange={(e) => {
                                  changeValue('cs_t_40', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_5}
                                onChange={(e) => {
                                  changeValue('cs_t_5', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_0}
                                onChange={(e) => {
                                  changeValue('cs_t_20', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>

                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_t_25}
                                onChange={(e) => {
                                  changeValue('cs_t_25', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">20</Typography>
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
                Exame de Resolução Temporal
              </Typography>
            </DialogTitle>
            <DialogContent>
              <MainCard
                title={
                  <Typography variant="subtitle1" textAlign="left">
                    Ouça o áudio e indique se ouviu 1 apito ou 2 apitos.
                  </Typography>
                }
                content={false}
                secondary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>2kHz</Typography>
                    <FormControlLabel
                      value={true}
                      control={<Switch color="primary" />}
                      name="cs_frequencia"
                      checked={Boolean(values.cs_frequencia)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Typography>1kHz</Typography>
                  </Stack>
                }
              >
                {values.cs_frequencia === true ? (
                  <>
                    <CardContent>
                      <Grid container spacing={10}>
                        <Grid item xs={2}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">1kHz</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">30</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">10</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">15</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">2</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">0</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">40</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">5</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">20</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">25</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">Menor Gap</Typography>
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
                              src="/assets/audios/pac/resolucao-temporal/audio-1k.mp3"
                              variant="contained"
                              color="success"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_30}
                                onChange={(e) => {
                                  changeValue('cs_30', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_10}
                                onChange={(e) => {
                                  changeValue('cs_10', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_15}
                                onChange={(e) => {
                                  changeValue('cs_15', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_2}
                                onChange={(e) => {
                                  changeValue('cs_2', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_0}
                                onChange={(e) => {
                                  changeValue('cs_0', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_40}
                                onChange={(e) => {
                                  changeValue('cs_40', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_5}
                                onChange={(e) => {
                                  changeValue('cs_5', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_20}
                                onChange={(e) => {
                                  changeValue('cs_20', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_25}
                                onChange={(e) => {
                                  changeValue('cs_25', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                            <Box></Box>
                            <Box></Box>
                            <Box></Box>
                            <Typography variant="subtitle1">{resultado(values)}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                  </>
                ) : (
                  <>
                    <CardContent>
                      <Grid container spacing={10}>
                        <Grid item xs={2}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">2kHz</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">20</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">2</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">40</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">5</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">10</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">25</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">15</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">0</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">30</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1">Menor Gap</Typography>
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
                              src="/assets/audios/pac/resolucao-temporal/audio-2k.mp3"
                              variant="contained"
                              color="success"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_20}
                                onChange={(e) => {
                                  changeValue('cs_20', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_2}
                                onChange={(e) => {
                                  changeValue('cs_2', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_40}
                                onChange={(e) => {
                                  changeValue('cs_40', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_5}
                                onChange={(e) => {
                                  changeValue('cs_5', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_10}
                                onChange={(e) => {
                                  changeValue('cs_10', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_25}
                                onChange={(e) => {
                                  changeValue('cs_25', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_15}
                                onChange={(e) => {
                                  changeValue('cs_15', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_0}
                                onChange={(e) => {
                                  changeValue('cs_0', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" alignItems="center" justifyContent="center">
                            <FormControl>
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.cs_30}
                                onChange={(e) => {
                                  changeValue('cs_30', e.target.value);
                                }}
                                column
                              >
                                <FormControlLabel value={false} control={<Radio color="primary" />} label="1" />
                                <FormControlLabel value={true} control={<Radio color="primary" />} label="2" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={1}>
                          <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                            <Box></Box>
                            <Box></Box>
                            <Box></Box>
                            <Typography variant="subtitle1">{resultado(values)}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </>
                )}
              </MainCard>
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

ResolucaoTemporalForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

ResolucaoTemporalForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ResolucaoTemporalForm;

import { Box, Button, CircularProgress, Divider, FormGroup, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
import { useRouter } from 'next/router';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/localizacao-sonora';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import DialogLocalizacaoSonoraExame from './dialogs/dialog-localizacao-sonora-exame';

const LocalizacaoSonoraForm = (props) => {
  const { initialValues, title } = props;

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object().shape({
    //   cs_recusa: Yup.boolean(),
    //   cs_mosquito: Yup.boolean().required(intl.formatMessage({ id: 'pac.sonora.cs_mosquito' }) + intl.formatMessage({ id: 'isRequired' })),
    //   cs_tesoura: Yup.boolean().required(intl.formatMessage({ id: 'pac.sonora.cs_tesoura' }) + intl.formatMessage({ id: 'isRequired' })),
    //   cs_porta: Yup.boolean().required(intl.formatMessage({ id: 'pac.sonora.cs_porta' }) + intl.formatMessage({ id: 'isRequired' })),
    //   cs_sino: Yup.boolean().required(intl.formatMessage({ id: 'pac.sonora.cs_sino' }) + intl.formatMessage({ id: 'isRequired' })),
    //   cs_latido: Yup.boolean().required(intl.formatMessage({ id: 'pac.sonora.cs_latido' }) + intl.formatMessage({ id: 'isRequired' }))
    // }),
    validationSchema: null
    // , onSubmit: (values) => {
    //   try {
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  });

  const [, setResultado] = useState(0);

  function contarValoresTrue(objeto) {
    let contagem = 0;
    for (let chave in objeto) {
      if (chave !== 'cs_recusa' && objeto[chave] === true) {
        contagem++;
      }
    }

    return (contagem / 5) * 100 + '%';
  }

  // eslint-disable-next-line no-unused-vars
  const atualizar = (values) => {
    setResultado(contarValoresTrue(values));

    setSubmitting(true);
    dispatch(editar(values.id_localizacao_sonora, values))
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

  // eslint-disable-next-line no-unused-vars
  const changeValue = (campo, valor) => {
    if (valor === 'true') {
      setFieldValue(campo, true);
    }

    if (valor === 'false') {
      setFieldValue(campo, false);
    }
  };

  const { values, handleSubmit, handleChange, handleBlur, isSubmitting, setSubmitting, setFieldValue } = formik;

  return (
    <Page title={title}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <MainCard
            title={
              <Typography variant="h3" color="textPrimary" gutterBottom>
                Localização Sonora
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
                Este exame avalia a habilidade do paciente em localizar a origem de sons no ambiente. <br />
                Use o botão <strong>Testar</strong> para garantir que o áudio está funcionando corretamente. <br />
                Clique em <strong>Iniciar</strong> para dar início à aplicação do exame com os estímulos sonoros.
              </Typography>
            </CardContent>
            <Divider />
            {values.cs_recusa === true ? (
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="ds_localizacao_sonora"
                    name="ds_localizacao_sonora"
                    label={<FormattedMessage id={'prontuario.cs_recusa'} />}
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={Infinity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ds_localizacao_sonora}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    fullWidth
                    variant="shadow"
                    color="secondary"
                    type="submit"
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
            )}
          </MainCard>

          <Dialog
            open={openTeste}
            onClose={() => {
              setOpenTeste(false);
            }}
          >
            <DialogTitle>Teste de Localização Sonora</DialogTitle>
            <DialogContent>
              <DialogContentText>Sinalize qual o lado que escutou o som.</DialogContentText>
              <DialogContentText>Você ouvirá vários sons em diferentes posições, descubra de qual lado vem o som !</DialogContentText>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <MainCard title="Em qual lado voçê ouviu o refrigerante ?" content={false}>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                          <AudioPlayerCircle
                            src="/assets/audios/pac/localizacao-sonora/teste-refri.mp3"
                            variant="contained"
                            color="error"
                            label="OD"
                          />
                        </Stack>
                      </CardContent>
                      <Divider />
                      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                        <Box>
                          <Typography variant="subtitle1">Gabarito</Typography>
                        </Box>
                        <Box>
                          <Typography>Esquerdo</Typography>
                        </Box>
                      </Stack>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MainCard title="Em qual lado o fosforo acendeu ?" content={false}>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                          <AudioPlayerCircle
                            src="/assets/audios/pac/localizacao-sonora/teste-fosforo.mp3"
                            variant="contained"
                            color="error"
                            label="OD"
                          />
                        </Stack>
                      </CardContent>
                      <Divider />
                      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                        <Box>
                          <Typography variant="subtitle1">Gabarito</Typography>
                        </Box>
                        <Box>
                          <Typography>Atrás</Typography>
                        </Box>
                      </Stack>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MainCard title="Em qual lado o aparelho elétrico ligou ?" content={false}>
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                          <AudioPlayerCircle
                            src="/assets/audios/pac/localizacao-sonora/teste-aparelho-eletrico.mp3"
                            variant="contained"
                            color="error"
                            label="OD"
                          />
                        </Stack>
                      </CardContent>
                      <Divider />
                      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                        <Box>
                          <Typography variant="subtitle1">Gabarito</Typography>
                        </Box>
                        <Box>
                          <Typography>Direito</Typography>
                        </Box>
                      </Stack>
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
          ></Dialog>
          <DialogLocalizacaoSonoraExame open={openExame} setOpen={setOpenExame} initialValues={initialValues} />
        </Form>
      </FormikProvider>
    </Page>
  );
};

LocalizacaoSonoraForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

export default LocalizacaoSonoraForm;

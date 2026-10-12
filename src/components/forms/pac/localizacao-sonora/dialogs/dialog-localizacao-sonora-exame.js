import { Button, CircularProgress, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/localizacao-sonora';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';

const style = {
  py: 0,
  width: '100%',
  maxWidth: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper'
};

const DialogLocalizacaoSonoraExame = (props) => {
  const { open, setOpen, initialValues } = props;

  const router = useRouter();
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const iconSX = {
    fontSize: '1rem',
    color: theme.palette.text.secondary
  };
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

  const changeValue = (campo, valor) => {
    setFieldValue(campo, valor);

    // if (valor === 'false') {
    //   setFieldValue(campo, false);
    // }
  };

  // eslint-disable-next-line no-unused-vars
  const { values, handleSubmit, handleChange, handleBlur, isSubmitting, setSubmitting, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h2" gutterBottom>
              Exame de Localização Sonora
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Sinalize qual o lado que escutou o som.
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Você ouvirá vários sons em diferentes posições, descubra de qual lado vem o som !
            </Typography>
          </DialogTitle>
          <DialogContent>
            <List sx={style}>
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AudioPlayerCircle
                      src="/assets/audios/pac/localizacao-sonora/audio-mosquito.mp3"
                      variant="contained"
                      color="error"
                      label="OD"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      Para qual lado o mosquito voou ?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="radio-buttons-group-mosquito"
                        value={values.cs_mosquito}
                        onChange={(e) => {
                          changeValue('cs_mosquito', e.target.value);
                        }}
                      >
                        <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                        <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AudioPlayerCircle
                      src="/assets/audios/pac/localizacao-sonora/audio-mosquito.mp3"
                      variant="contained"
                      color="error"
                      label="OD"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      Para qual lado o mosquito voou ?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="radio-buttons-group-mosquito"
                        value={values.cs_mosquito}
                        onChange={(e) => {
                          changeValue('cs_mosquito', e.target.value);
                        }}
                      >
                        <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                        <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AudioPlayerCircle
                      src="/assets/audios/pac/localizacao-sonora/audio-tesoura.mp3"
                      variant="contained"
                      color="error"
                      label="OD"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      Para qual lado a tesoura cortou ?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="radio-buttons-group-cs_tesoura"
                        value={values.cs_tesoura}
                        onChange={(e) => {
                          changeValue('cs_tesoura', e.target.value);
                        }}
                      >
                        <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                        <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AudioPlayerCircle
                      src="/assets/audios/pac/localizacao-sonora/audio-porta.mp3"
                      variant="contained"
                      color="error"
                      label="OD"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      Em qual lado a porta foi fechada ?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <RadioGroup
                        name="radio-buttons-group-cs_porta"
                        value={values.cs_porta}
                        onChange={(e) => changeValue('cs_porta', e.target.value)}
                        row
                      >
                        <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                        <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AudioPlayerCircle
                      src="/assets/audios/pac/localizacao-sonora/audio-sino.mp3"
                      variant="contained"
                      color="error"
                      label="OD"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      De qual lado você ouviu o som do sino ?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <RadioGroup
                        name="radio-buttons-group-cs_sino"
                        value={values.cs_sino}
                        onChange={(e) => changeValue('cs_sino', e.target.value)}
                        row
                      >
                        <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                        <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AudioPlayerCircle
                      src="/assets/audios/pac/localizacao-sonora/audio-latido.mp3"
                      variant="contained"
                      color="error"
                      label="OD"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      De qual lado está vindo o latido do cachorro ?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <RadioGroup
                        name="radio-buttons-group"
                        value={values.cs_latido}
                        onChange={(e) => changeValue('cs_latido', e.target.value)}
                        row
                      >
                        <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                        <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                        <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Fechar
            </Button>
            <Button
              onClick={() => {
                atualizar(values);
                setOpen(false);
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
  );
};

DialogLocalizacaoSonoraExame.propTypes = {
  initialValues: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default DialogLocalizacaoSonoraExame;

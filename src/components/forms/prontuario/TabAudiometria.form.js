import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout/index';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/audiometria';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import { TextField } from '../../../../node_modules/@mui/material/index';
import { FormattedMessage } from '../../../../node_modules/react-intl/index';

// ==============================|| ACCOUNT PROFILE - MY ACCOUNT ||============================== //

const TabAudiometriaForm = (props) => {
  const { initialValues } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues.audiometria,
    validationSchema: null,
    onSubmit: (values) => {
      try {
        setSubmitting(true);
        dispatch(editar(values.id_audiometria, values))
          .then(() => {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Audiometria atualizada com sucesso!',
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
      } catch (error) {
        console.error(error);
      }
    }
  });

  const onCancel = () => {
    router.push('/core/prontuario');
  };

  // eslint-disable-next-line no-unused-vars
  const { values, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

  const changeValue = (campo, valor) => {
    setFieldValue(campo, JSON.parse(valor));
  };

  const campos = ['od_audio', 'oe_audio', 'cs_tecnica'];

  useEffect(() => {
    values.cs_recusa === true
      ? campos.forEach((campo) => {
          formik.setFieldValue(campo, null);
        })
      : formik.setFieldValue('ds_audiometria', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.cs_recusa]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MainCard
              title="Audiometria"
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
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <List sx={{ p: 0 }}>
                    <ListItem divider>
                      <ListItemText id="esquerda" primary="Orelha Esquerda" />

                      <Stack direction="column">
                        <FormControl>
                          <Typography variant="subtitle1">Audiometria tonal</Typography>
                          <Stack alignItems="center" justifyContent="center">
                            <RadioGroup
                              name="radio-buttons-group"
                              value={values.oe_audio}
                              onChange={(e) => {
                                changeValue('oe_audio', e.target.value);
                              }}
                              column
                            >
                              <FormControlLabel
                                value={true}
                                control={<Radio color="primary" />}
                                label="Passa"
                                disabled={values.cs_recusa === true ? true : false}
                              />
                              <FormControlLabel
                                value={false}
                                control={<Radio color="primary" />}
                                label="Falha"
                                disabled={values.cs_recusa === true ? true : false}
                              />
                            </RadioGroup>
                          </Stack>
                        </FormControl>
                      </Stack>
                    </ListItem>
                    <ListItem divider>
                      <ListItemText id="direita" primary="Orelha Direita" />
                      <Stack direction="column">
                        <FormControl>
                          <Typography variant="subtitle1">Audiometria tonal</Typography>
                          <Stack alignItems="center" justifyContent="center">
                            <RadioGroup
                              name="radio-buttons-group"
                              value={values.od_audio}
                              onChange={(e) => {
                                changeValue('od_audio', e.target.value);
                              }}
                              column
                            >
                              <FormControlLabel
                                value={true}
                                control={<Radio color="error" />}
                                label="Passa"
                                disabled={values.cs_recusa === true ? true : false}
                              />
                              <FormControlLabel
                                value={false}
                                control={<Radio color="error" />}
                                label="Falha"
                                disabled={values.cs_recusa === true ? true : false}
                              />
                            </RadioGroup>
                          </Stack>
                        </FormControl>
                      </Stack>
                    </ListItem>
                  </List>
                </Grid>
                {values.cs_recusa === true ? (
                  <Grid item xs={12} sm={12}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={3}
                      sx={{ p: 3, a: { textDecoration: 'none', color: 'inherit' } }}
                    >
                      <TextField
                        id="ds_audiometria"
                        name="ds_audiometria"
                        label={<FormattedMessage id={'prontuario.cs_recusa'} />}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={Infinity}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ds_audiometria}
                      />
                    </Stack>
                  </Grid>
                ) : null}
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Voltar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
                variant="contained"
                color="primary"
              >
                Salvar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

TabAudiometriaForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

TabAudiometriaForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabAudiometriaForm;

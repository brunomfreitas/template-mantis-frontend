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
  TextField,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/otoemissao';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';

// ==============================|| ACCOUNT PROFILE - MY ACCOUNT ||============================== //

const TabOtoemissaoForm = (props) => {
  const { initialValues } = props;
  // eslint-disable-next-line no-unused-vars
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues.otoemissao,
    validationSchema: null,
    onSubmit: () => {
      try {
        setSubmitting(true);
        dispatch(editar(values.id_otoemissao, values))
          .then(() => {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Otoemissão atualizada com sucesso!',
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

  // eslint-disable-next-line no-unused-vars
  const { values, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

  const changeValue = (campo, valor) => {
    setFieldValue(campo, JSON.parse(valor));
  };

  const onCancel = () => {
    router.push('/core/prontuario');
  };

  const campos = ['od_eoa_distorcao', 'od_eoa_transiente', 'oe_eoa_distorcao', 'oe_eoa_transiente'];

  useEffect(() => {
    values.cs_recusa === true
      ? campos.forEach((campo) => {
          formik.setFieldValue(campo, null);
        })
      : formik.setFieldValue('ds_otoemissao', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.cs_recusa]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MainCard
              title="Otoemissão"
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
                      <Stack direction="row" spacing={5}>
                        <Stack direction="column">
                          <FormControl>
                            <Typography variant="subtitle1">EOA Produto de Distorção</Typography>
                            <Stack alignItems="center" justifyContent="center">
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.oe_eoa_distorcao}
                                onChange={(e) => {
                                  changeValue('oe_eoa_distorcao', e.target.value);
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
                        <Stack direction="column">
                          <FormControl>
                            <Typography variant="subtitle1">EOA Transiente</Typography>
                            <Stack alignItems="center" justifyContent="center">
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.oe_eoa_transiente}
                                onChange={(e) => {
                                  changeValue('oe_eoa_transiente', e.target.value);
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
                      </Stack>
                    </ListItem>
                    <ListItem divider>
                      <ListItemText id="transiente" primary="Orelha Direita" />

                      <Stack direction="row" spacing={5}>
                        <Stack direction="column">
                          <FormControl>
                            <Typography variant="subtitle1">EOA Produto de Distorção</Typography>
                            <Stack alignItems="center" justifyContent="center">
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.od_eoa_distorcao}
                                onChange={(e) => {
                                  changeValue('od_eoa_distorcao', e.target.value);
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
                        <Stack direction="column">
                          <FormControl>
                            <Typography variant="subtitle1">EOA Transiente</Typography>
                            <Stack alignItems="center" justifyContent="center">
                              <RadioGroup
                                name="radio-buttons-group"
                                value={values.od_eoa_transiente}
                                onChange={(e) => {
                                  changeValue('od_eoa_transiente', e.target.value);
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
                        id="ds_otoemissao"
                        name="ds_otoemissao"
                        label={<FormattedMessage id={'prontuario.cs_recusa'} />}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={Infinity}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ds_otoemissao}
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

TabOtoemissaoForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default TabOtoemissaoForm;

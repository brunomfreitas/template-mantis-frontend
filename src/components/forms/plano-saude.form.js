import { MailOutlined, PhoneOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Grid, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PatternFormat } from 'react-number-format';
import { useDispatch } from 'store';
import { editar, novo } from 'store/reducers/plano-saude';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

// ==============================|| Escolas ||============================== //

const PlanoSaudeForm = (props) => {
  const { initialValues, title, state } = props;

  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

  const [view, setView] = useState(false);

  useEffect(() => {
    if (state === 'view') {
      setView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onCancel = () => {
    router.push('/core/plano-saude');
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      nm_plano_saude: Yup.string()
        .max(255)
        .required(intl.formatMessage({ id: 'planoSaude.nm_plano_saude' }) + intl.formatMessage({ id: 'isRequired' })),
      nr_cnpj: Yup.string()
        .max(20)
        .required(intl.formatMessage({ id: 'planoSaude.nr_cnpj' }) + intl.formatMessage({ id: 'isRequired' }))
    }),
    onSubmit: (values) => {
      try {
        if (state === 'edit') {
          // Se estiver no modo de edição, atualize o item
          dispatch(editar(values.id_plano_saude, values))
            .then(() => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Plano de Saúde armazenado com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/plano-saude');
            })
            .finally(() => {
              setSubmitting(false);
            });
        } else if (state === 'create') {
          // Se estiver no modo de criação, crie um novo item
          dispatch(novo(values))
            .then(() => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Plano de Saúde criado com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              //   router.push('/core/plano-saude');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting } = formik;

  return (
    <Page title={title}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <MainCard border={false} boxShadow>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MainCard title={title}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                          <Stack spacing={1}>
                            <PatternFormat
                              format="##.###.###/####-##"
                              mask="_"
                              fullWidth
                              customInput={TextField}
                              id="nr_cnpj"
                              name="nr_cnpj"
                              type="text"
                              label={<FormattedMessage id={'planoSaude.nr_cnpj'} />}
                              value={values.nr_cnpj}
                              error={Boolean(touched.nr_cnpj && errors.nr_cnpj)}
                              helperText={errors.nr_cnpj && touched.nr_cnpj ? errors.nr_cnpj : null}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            />
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={9}>
                          <Stack spacing={1}>
                            <TextField
                              id="nm_plano_saude"
                              name="nm_plano_saude"
                              type="text"
                              label={<FormattedMessage id={'planoSaude.nm_plano_saude'} />}
                              error={Boolean(touched.nm_plano_saude && errors.nm_plano_saude)}
                              helperText={errors.nm_plano_saude && touched.nm_plano_saude ? errors.nm_plano_saude : null}
                              value={values.nm_plano_saude}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            ></TextField>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12}>
                    <MainCard title="Contato">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="nm_email"
                              name="nm_email"
                              type="email"
                              label={<FormattedMessage id={'planoSaude.nm_email'} />}
                              error={Boolean(touched.nm_email && errors.nm_email)}
                              helperText={errors.nm_email && touched.nm_email ? errors.nm_email : null}
                              value={values.nm_email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view,
                                startAdornment: <MailOutlined />
                              }}
                            ></TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <PatternFormat
                              format="(##) #####-####"
                              mask="_"
                              fullWidth
                              value={values.nr_telefone}
                              customInput={TextField}
                              placeholder="Tel. com DDD"
                              id="nr_telefone"
                              name="nr_telefone"
                              type="text"
                              label={<FormattedMessage id={'planoSaude.nr_telefone'} />}
                              error={Boolean(touched.nr_telefone && errors.nr_telefone)}
                              helperText={errors.nr_telefone && touched.nr_telefone ? errors.nr_telefone : null}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view,
                                startAdornment: <PhoneOutlined />
                              }}
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                      <Button variant="outlined" color="secondary" onClick={onCancel}>
                        {view ? 'Voltar' : 'Cancelar'}
                      </Button>
                      {view ? null : (
                        <Button
                          disabled={isSubmitting}
                          startIcon={isSubmitting && <CircularProgress size={20} />}
                          type="submit"
                          variant="contained"
                        >
                          {state === 'edit' ? 'Gravar' : 'Cadastrar'}
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Form>
      </FormikProvider>
    </Page>
  );
};

PlanoSaudeForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  state: PropTypes.string
};

PlanoSaudeForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PlanoSaudeForm;

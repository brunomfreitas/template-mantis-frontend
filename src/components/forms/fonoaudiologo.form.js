import { MailOutlined, PhoneOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Grid, MenuItem, Stack, TextField } from '@mui/material';
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
import { editar, novo } from 'store/reducers/fonoaudiologo';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

// ==============================|| Fonoaudiologo ||============================== //

const FonoaudiologoForm = (props) => {
  const { initialValues, title, state } = props;

  const intl = useIntl();
  const router = useRouter();
  // const { id } = router.query;
  // const theme = useTheme();
  // const user = useUser();
  const dispatch = useDispatch();

  const sexo = [
    { ID: 'F', NOME: 'Feminino' },
    { ID: 'M', NOME: 'Masculino' }
  ];

  const maxDate = new Date();
  maxDate.getDate();

  const [view, setView] = useState(false);

  useEffect(() => {
    if (state === 'view') {
      setView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onCancel = () => {
    router.push('/core/fonoaudiologo');
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      nm_fonoaudiologo: Yup.string()
        .max(255)
        .required(intl.formatMessage({ id: 'fonoaudiologo.nm_fonoaudiologo' }) + intl.formatMessage({ id: 'isRequired' })),
      dt_nascimento: Yup.date()
      //required(intl.formatMessage({ id: 'paciente.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' })),
    }),
    onSubmit: (values) => {
      try {
        if (state === 'edit') {
          // Se estiver no modo de edição, atualize o item
          dispatch(editar(values.id_fonoaudiologo, values))
            .then(() => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Fonoaudiologo armazenado com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/fonoaudiologo');
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
                  message: 'Fonoaudiologo criado com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/fonoaudiologo');
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
                    <MainCard title="Fonoaudiologo">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <PatternFormat
                              format="###.###.###-##"
                              mask="_"
                              fullWidth
                              customInput={TextField}
                              id="nr_cpf"
                              name="nr_cpf"
                              type="text"
                              label={<FormattedMessage id={'fonoaudiologo.nr_cpf'} />}
                              value={values.nr_cpf}
                              error={Boolean(touched.nr_cpf && errors.nr_cpf)}
                              helperText={errors.nr_cpf && touched.nr_cpf ? errors.nr_cpf : null}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="dt_nascimento"
                              name="dt_nascimento"
                              type="date"
                              label={<FormattedMessage id={'fonoaudiologo.dt_nascimento'} />}
                              error={Boolean(touched.dt_nascimento && errors.dt_nascimento)}
                              helperText={errors.dt_nascimento && touched.dt_nascimento ? errors.dt_nascimento : null}
                              value={values.dt_nascimento}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            ></TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="nm_fonoaudiologo"
                              name="nm_fonoaudiologo"
                              type="text"
                              label={<FormattedMessage id={'fonoaudiologo.nm_fonoaudiologo'} />}
                              error={Boolean(touched.nm_fonoaudiologo && errors.nm_fonoaudiologo)}
                              helperText={errors.nm_fonoaudiologo && touched.nm_fonoaudiologo ? errors.nm_fonoaudiologo : null}
                              value={values.nm_fonoaudiologo}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            ></TextField>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="dt_admissao"
                              name="dt_admissao"
                              type="date"
                              label={<FormattedMessage id={'fonoaudiologo.dt_admissao'} />}
                              error={Boolean(touched.dt_admissao && errors.dt_admissao)}
                              helperText={errors.dt_admissao && touched.dt_admissao ? errors.dt_admissao : null}
                              value={values.dt_admissao || ''}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            ></TextField>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="sexo"
                              name="cs_genero"
                              select
                              label={<FormattedMessage id={'fonoaudiologo.cs_genero'} />}
                              error={Boolean(touched.cs_genero && errors.cs_genero)}
                              helperText={errors.cs_genero && touched.cs_genero ? errors.cs_genero : null}
                              value={values.cs_genero || ''}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            >
                              <MenuItem value="">
                                <em>Selecione</em>
                              </MenuItem>
                              {sexo.map((valor) => (
                                <MenuItem key={valor.ID} value={valor.ID}>
                                  {valor.NOME}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="nr_crf"
                              name="nr_crf"
                              type="number"
                              label={<FormattedMessage id={'fonoaudiologo.nr_crf'} />}
                              error={Boolean(touched.nm_fonoaudiologo && errors.nr_crf)}
                              helperText={errors.nr_crf && touched.nr_crf ? errors.nr_crf : null}
                              value={values.nr_crf}
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
                              label={<FormattedMessage id={'fonoaudiologo.nm_email'} />}
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
                              label={<FormattedMessage id={'fonoaudiologo.nr_telefone'} />}
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

FonoaudiologoForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  state: PropTypes.string
};

FonoaudiologoForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default FonoaudiologoForm;

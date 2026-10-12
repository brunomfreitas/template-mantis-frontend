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
import { editar, novo } from 'store/reducers/escola';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

// ==============================|| Escolas ||============================== //

const EscolaForm = (props) => {
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
    router.push('/core/escola');
  };

  // endereço
  const regioesAdministrativas = [
    { ID: '20', NOME: 'Águas Claras' },
    { ID: '4', NOME: 'Brazlândia' },
    { ID: '1', NOME: 'Brasília' },
    { ID: '19', NOME: 'Candangolândia' },
    { ID: '9', NOME: 'Ceilândia' },
    { ID: '11', NOME: 'Cruzeiro' },
    { ID: '15', NOME: 'Recanto das Emas' },
    { ID: '5', NOME: 'Sobradinho' },
    { ID: '26', NOME: 'Sobradinho II' },
    { ID: '22', NOME: 'Sudoeste/Octogonal' },
    { ID: '3', NOME: 'Taguatinga' },
    { ID: '27', NOME: 'Jardim Botânico' },
    { ID: '18', NOME: 'Lago Norte' },
    { ID: '16', NOME: 'Lago Sul' },
    { ID: '8', NOME: 'Núcleo Bandeirante' },
    { ID: '7', NOME: 'Paranoá' },
    { ID: '24', NOME: 'Park Way' },
    { ID: '6', NOME: 'Planaltina' },
    { ID: '31', NOME: 'Fercal' },
    { ID: '2', NOME: 'Gama' },
    { ID: '10', NOME: 'Guará' },
    { ID: '28', NOME: 'Itapoã' },
    { ID: '17', NOME: 'Riacho Fundo' },
    { ID: '21', NOME: 'Riacho Fundo II' },
    { ID: '12', NOME: 'Samambaia' },
    { ID: '13', NOME: 'Santa Maria' },
    { ID: '30', NOME: 'Vicente Pires' },
    { ID: '23', NOME: 'Varjão' },
    { ID: '14', NOME: 'São Sebastião' },
    { ID: '25', NOME: 'SCIA (Estrutural)' },
    { ID: '29', NOME: 'SIA' },
    { ID: '32', NOME: 'Sol Nascente/Pôr do Sol' }
  ];

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      nm_escola: Yup.string()
        .max(255)
        .required(intl.formatMessage({ id: 'escola.nm_escola' }) + intl.formatMessage({ id: 'isRequired' })),
      nr_cnpj: Yup.string().max(20)
      // .required(intl.formatMessage({ id: 'escola.nr_cnpj' }) + intl.formatMessage({ id: 'isRequired' }))
    }),
    onSubmit: (values) => {
      try {
        if (state === 'edit') {
          // Se estiver no modo de edição, atualize o item
          dispatch(editar(values.id_escola, values))
            .then(() => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Escola armazenada com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/escola/');
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
                  message: 'Escola criada com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/escola');
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
                              label={<FormattedMessage id={'escola.nr_cnpj'} />}
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
                              id="nm_escola"
                              name="nm_escola"
                              type="text"
                              label={<FormattedMessage id={'escola.nm_escola'} />}
                              error={Boolean(touched.nm_escola && errors.nm_escola)}
                              helperText={errors.nm_escola && touched.nm_escola ? errors.nm_escola : null}
                              value={values.nm_escola}
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
                    <MainCard title="Responsável">
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="nm_responsavel"
                              name="nm_responsavel"
                              type="text"
                              label={<FormattedMessage id={'escola.nm_responsavel'} />}
                              error={Boolean(touched.nm_responsavel && errors.nm_responsavel)}
                              helperText={errors.nm_responsavel && touched.nm_responsavel ? errors.nm_responsavel : null}
                              value={values.nm_responsavel}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            ></TextField>
                          </Stack>
                        </Grid>

                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <TextField
                              id="nm_regiao_administrativa"
                              name="nm_regiao_administrativa"
                              select
                              label={<FormattedMessage id={'fonoaudiologo.nm_regiao_administrativa'} />}
                              error={Boolean(touched.nm_regiao_administrativa && errors.nm_regiao_administrativa)}
                              helperText={
                                errors.nm_regiao_administrativa && touched.nm_regiao_administrativa ? errors.nm_regiao_administrativa : null
                              }
                              value={values.nm_regiao_administrativa || ''}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                readOnly: view
                              }}
                            >
                              <MenuItem value="">
                                <em>Selecione</em>
                              </MenuItem>
                              {regioesAdministrativas.map((valor) => (
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
                              id="nm_email"
                              name="nm_email"
                              type="email"
                              label={<FormattedMessage id={'escola.nm_email'} />}
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
                              label={<FormattedMessage id={'escola.nr_telefone'} />}
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

EscolaForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  title: PropTypes.string,
  state: PropTypes.string
};

EscolaForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default EscolaForm;

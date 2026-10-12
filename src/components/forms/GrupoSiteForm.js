import { Grid, MenuItem, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { editar, novo } from 'store/reducers/assistente';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

const GrupoSiteForm = (props) => {
  const { initialValues, title, state } = props;

  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

  const maxDate = new Date();
  maxDate.getDate();

  // eslint-disable-next-line no-unused-vars
  const [view, setView] = useState(false);

  useEffect(() => {
    if (state === 'view') {
      setView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // eslint-disable-next-line no-unused-vars
  const onCancel = () => {
    router.push('/core/assistente');
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      id_site: Yup.string()
        .max(255)
        .required(intl.formatMessage({ id: 'assistente.nm_assistente' }) + intl.formatMessage({ id: 'isRequired' })),
      dt_nascimento: Yup.date()
      //required(intl.formatMessage({ id: 'paciente.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' })),
    }),
    onSubmit: (values) => {
      try {
        if (state === 'edit') {
          // Se estiver no modo de edição, atualize o item
          dispatch(editar(values.id_assistente, values))
            .then(() => {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Assistente armazenado com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/assistente');
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
                  message: 'Assistente criado com sucesso!',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  }
                })
              );
              router.push('/core/assistente');
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

  // eslint-disable-next-line no-unused-vars
  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting } = formik;

  return (
    <Page title={title}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <MainCard border={false} boxShadow>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <TextField
                    id="sexo"
                    name="id_site"
                    select
                    label={<FormattedMessage id={'paciente.cs_genero'} />}
                    error={Boolean(touched.id_site && errors.id_site)}
                    helperText={errors.id_site && touched.id_site ? errors.id_site : null}
                    value={values.id_site}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {[].map((valor) => (
                      <MenuItem key={valor.id_site} value={valor.id_site}>
                        {valor.nm_site}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Form>
      </FormikProvider>
    </Page>
  );
};

GrupoSiteForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  state: PropTypes.string,
  title: PropTypes.string
};

export default GrupoSiteForm;

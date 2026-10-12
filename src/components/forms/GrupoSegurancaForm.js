import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import TabelaNovaLinhaGrupoSite from 'pages/core/grupo-seguranca/tabela/tabela-nova-linha-grupo-site';
import Listar from 'pages/core/grupo-site/index';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { dispatch, useSelector } from 'store';
import { editar, novo } from 'store/reducers/assistente';
import { fetchAll } from 'store/reducers/site';
import { openSnackbar } from 'store/reducers/snackbar';

const GrupoSegurancaForm = (props) => {
  const { initialValues, title, state } = props;

  const router = useRouter();
  const { id } = router.query;

  const [tab, setTab] = useState('1');

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  const { list: sites } = useSelector((state) => state.site);

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  const dataSite = (data) => {
    if (!data || !Array.isArray(data.grupo_site)) return [];

    return data.grupo_site.map((item) => ({
      id_grupo_seguranca: data.id_grupo_seguranca,
      id_site: item.site?.id_site,
      nm_site: item.site?.nm_site
    }));
  };

  const [siteTable, setSiteTable] = useState(dataSite(initialValues));

  useEffect(() => {
    setSiteTable(dataSite(initialValues));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object().shape({
    //   nm_assistente: Yup.string()
    // 	.max(255)
    // 	.required(intl.formatMessage({ id: 'assistente.nm_assistente' }) + intl.formatMessage({ id: 'isRequired' })),
    //   dt_nascimento: Yup.date()
    //   //required(intl.formatMessage({ id: 'paciente.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' })),
    // }),
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

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id_site',
        disableGroupBy: true
      },
      {
        Header: 'Site',
        accessor: 'nm_site',
        dataType: 'select',
        disableGroupBy: true
      }
    ],
    []
  );

  const botaoExcluir = () => true;

  const openDeleteModal = () => {
    return true;
  };

  return (
    <Page title={title}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <MainCard border={false} boxShadow>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="nm_grupo_seguranca"
                  name="nm_grupo_seguranca"
                  type="text"
                  label={<FormattedMessage id={'grupo_seguranca.nm_grupo_seguranca'} />}
                  fullWidth
                  value={values.nm_grupo_seguranca}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.nm_grupo_seguranca && errors.nm_grupo_seguranca)}
                  helperText={errors.nm_grupo_seguranca && touched.nm_grupo_seguranca ? errors.nm_grupo_seguranca : null}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Site" value="1" />
                        <Tab label="Aplicações" value="2" />
                        <Tab label="Usuários" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <TabelaNovaLinhaGrupoSite
                        title=""
                        columns={columns}
                        data={siteTable}
                        showDelete={botaoExcluir()}
                        openDeleteModal={openDeleteModal}
                        load={() => {}}
                        codId={values.id_grupo_seguranca}
                        state={state}
                        sites={sites}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <Listar id={id} sites={sites} />
                    </TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                  </TabContext>
                </Box>
              </Grid>
            </Grid>
          </MainCard>
        </Form>
      </FormikProvider>
    </Page>
  );
};

GrupoSegurancaForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  state: PropTypes.string,
  title: PropTypes.string
};

export default GrupoSegurancaForm;

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, CircularProgress, Grid, MenuItem, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { create, update } from 'store/reducers/grupo-seguranca';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';
import TabGrupoSegurancaAplicacoesForm from './tabs/TabGrupoSegurancaAplicacoesForm';
import TabGrupoSegurancaUsuariosForm from './tabs/TabGrupoSegurancaUsuariosForm';

const GrupoSegurancaForm = (props) => {
    const { initialValues, title, state, load } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();

    const [view, setView] = useState(false);
    const [tab, setTab] = useState('1');

    const [sites, setSites] = useState([]);

    const handleChangeTab = (event, value) => {
        setTab(value);
    };

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(() => {
        if (initialValues?.site) {
            const values = initialValues.site.map(({ id_site, nm_site, st_ativo }) => ({
                id_site: id_site,
                nm_site: nm_site,
                st_ativo: st_ativo === 'true' ? 'Sim' : 'Não'
            }));
            setSites(values);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    const onCancel = () => {
        router.push('/core/grupo-seguranca');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nm_grupo_seguranca: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'grupo-seguranca.nm_grupo_seguranca' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item
                    dispatch(
                        update(values?.id_grupo_seguranca, {
                            nm_grupo_seguranca: values?.nm_grupo_seguranca,
                            st_ativo: values?.st_ativo
                        })
                    )
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Grupo de Segurança atualizada com sucesso !',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                } else if (state === 'create') {
                    // Se estiver no modo de criação, crie um novo item
                    dispatch(create({ nm_grupo_seguranca: values?.nm_grupo_seguranca }))
                        .then((resp) => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Grupo de Segurança criado com sucesso !',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/grupo-seguranca/editar/${resp.id_grupo_seguranca}`);
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
                    <MainCard border={false} title={title} boxShadow>
                        <Grid container spacing={2}>
                            {state === 'create' ? null : (
                                <Grid item xs={2}>
                                    <TextField
                                        id="id_grupo_seguranca"
                                        name="id_grupo_seguranca"
                                        type="text"
                                        label={<FormattedMessage id={'grupo-seguranca.id_grupo_seguranca'} />}
                                        fullWidth
                                        value={values?.id_grupo_seguranca}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Grid>
                            )}
                            <Grid item xs={state === 'create' ? 12 : 6}>
                                <TextField
                                    id="nm_grupo_seguranca"
                                    name="nm_grupo_seguranca"
                                    type="text"
                                    label={<FormattedMessage id={'grupo-seguranca.nm_grupo_seguranca'} />}
                                    fullWidth
                                    value={values?.nm_grupo_seguranca}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nm_grupo_seguranca && errors.nm_grupo_seguranca)}
                                    helperText={errors.nm_grupo_seguranca && touched.nm_grupo_seguranca ? errors.nm_grupo_seguranca : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            {state === 'create' ? null : (
                                <>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="dt_cadastro"
                                            name="dt_cadastro"
                                            type="datetime"
                                            label={<FormattedMessage id={'organizacao.dt_cadastro'} />}
                                            fullWidth
                                            value={isoToFormat(values?.dt_cadastro, DATETIME_BR)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.dt_cadastro && errors.dt_cadastro)}
                                            helperText={errors.dt_cadastro && touched.dt_cadastro ? errors.dt_cadastro : null}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="st_ativo"
                                            name="st_ativo"
                                            select
                                            label={<FormattedMessage id={'organizacao.st_ativo'} />}
                                            fullWidth
                                            value={values?.st_ativo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.st_ativo && errors.st_ativo)}
                                            helperText={errors.st_ativo && touched.st_ativo ? errors.st_ativo : null}
                                            InputProps={{
                                                readOnly: state === 'view'
                                            }}
                                        >
                                            <MenuItem value={true}>Sim</MenuItem>
                                            <MenuItem value={false}>Não</MenuItem>
                                        </TextField>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={tab}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                                <Tab label="Aplicações" value="1" />
                                                <Tab label="Usuários" value="2" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <TabGrupoSegurancaAplicacoesForm
                                                data={values?.grupo_aplicacao ? values?.grupo_aplicacao : []}
                                                cod={values?.id_grupo_seguranca}
                                                load={load}
                                            />
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <TabGrupoSegurancaUsuariosForm
                                                data={values?.grupo_usuario}
                                                id={values?.id_grupo_seguranca}
                                                load={load}
                                            />
                                        </TabPanel>
                                    </TabContext>
                                </Box>
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
                    </MainCard>
                </Form>
            </FormikProvider>
        </Page>
    );
};

GrupoSegurancaForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

GrupoSegurancaForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default GrupoSegurancaForm;

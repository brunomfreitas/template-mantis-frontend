import { Button, CircularProgress, Grid, MenuItem, Stack, TextField } from '@mui/material';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { useApiError } from 'errors/hooks/use-api-error';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { search } from 'store/reducers/organizacao';
import { create, update } from 'store/reducers/site';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

const SiteForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleApiError } = useApiError();

    const [view, setView] = useState(false);

    const { list, isLoader } = useSelector((state) => state.organizacao);

    useEffect(() => {
        dispatch(
            search({
                expr: 'st_ativo = true',
                page: 0,
                pageSize: 20,
                orderBy: 'nm_organizacao',
                orderDir: 'asc'
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/site');
    };

    const formik = useFormik({
        initialValues: {
            id_site: initialValues?.id_site ?? null,
            nm_site: initialValues?.nm_site ?? '',
            st_ativo: initialValues?.st_ativo,
            dt_cadastro: initialValues?.dt_cadastro ?? null,
            id_organizacao: initialValues?.id_organizacao ?? null // se o Yup esperar number e aqui vier string, converta no onChange
        },
        validationSchema: Yup.object().shape({
            nm_site: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'site.nm_site' }) + intl.formatMessage({ id: 'isRequired' })),
            id_organizacao: Yup.number().required(
                intl.formatMessage({ id: 'site.id_organizacao' }) + intl.formatMessage({ id: 'isRequired' })
            )
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item
                    dispatch(update(values.id_site, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Site atualizado com sucesso!',
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
                    dispatch(create(values))
                        .then((resp) => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Site criado com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/site/editar/${resp.id_site}`);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }
            } catch (error) {
                console.error(error);
                handleApiError(error);
            }
        }
    });

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting } = formik;

    if (isLoader) return <Loader />;

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard border={false} title={title} boxShadow>
                        <Grid container spacing={2}>
                            {state === 'create' ? null : (
                                <Grid item xs={2}>
                                    <TextField
                                        id="id_site"
                                        name="id_site"
                                        type="text"
                                        label={<FormattedMessage id={'site.id_site'} />}
                                        fullWidth
                                        value={values?.id_site}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Grid>
                            )}
                            <Grid item xs={6}>
                                <TextField
                                    id="nm_site"
                                    name="nm_site"
                                    type="text"
                                    label={<FormattedMessage id={'site.nm_site'} />}
                                    fullWidth
                                    value={values?.nm_site}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={errors.nm_site && touched.nm_site}
                                    helperText={errors.nm_site && touched.nm_site && errors.nm_site}
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
                                            label={<FormattedMessage id={'site.dt_cadastro'} />}
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
                                            label={<FormattedMessage id={'site.st_ativo'} />}
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
                            <Grid item xs={6}>
                                <TextField
                                    id="id_organizacao"
                                    name="id_organizacao"
                                    select
                                    label={<FormattedMessage id={'site.id_organizacao'} />}
                                    fullWidth
                                    value={values?.id_organizacao}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.id_organizacao && errors.id_organizacao)}
                                    helperText={errors.id_organizacao && touched.id_organizacao ? errors.id_organizacao : null}
                                    InputProps={{
                                        readOnly: view
                                    }}
                                >
                                    <MenuItem value={null}>
                                        <em>Selecione</em>
                                    </MenuItem>
                                    {list.map((item) => (
                                        <MenuItem key={item.id_organizacao} value={item.id_organizacao}>
                                            {item.nm_organizacao}
                                        </MenuItem>
                                    ))}
                                </TextField>
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

SiteForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

SiteForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SiteForm;

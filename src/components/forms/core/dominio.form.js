import { Autocomplete, Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { useApiError } from 'errors/hooks/use-api-error';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { useSelector } from 'store/index';
import { create, fetchById, update } from 'store/reducers/dominio';
import { openSnackbar } from 'store/reducers/snackbar';
import TabelaNovaLinhaDominio from 'utils/tabela-dinamica/tabela-nova-linha-dominio';
import * as Yup from 'yup';

// ==============================|| Fonoaudiologo ||============================== //

const DominioForm = (props) => {
    const { initialValues, title, state, dominios } = props;

    const dispatch = useDispatch();
    const [dominioValor, setDominioValor] = useState([]);
    const intl = useIntl();
    const { handleApiError } = useApiError();

    const { item } = useSelector((state) => state.dominio);

    const [view, setView] = useState(false);
    const router = useRouter();

    const onCancel = () => {
        router.push('/core/dominio');
    };

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        if (initialValues?.id_dominio_sup) {
            const domValue = dominios?.find((item) => item.id_dominio === values.id_dominio_sup);
            setDominioValor(domValue.dominio_valor);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nm_dominio: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'dominio.nm_dominio' }) + intl.formatMessage({ id: 'isRequired' })),
            ds_alias: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'dominio.ds_alias' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item
                    dispatch(update(values.id_dominio, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Dominio armazenado com sucesso!',
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
                                    message: 'Dominio criado com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            console.log('resp', resp);
                            router.push(`/core/dominio/editar/${resp.id_dominio}`);
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

    const load = () => {
        dispatch(fetchById(initialValues.id_dominio)).then(() => {
            setFieldValue('dominio_valor', item.dominio_valor);
            setDominioValor(item.dominio_valor);
        });
        // .finally(() => {
        //   setSubmitting(false);
        // });
    };

    const openDeleteModal = () => {
        return true;
    };

    const botaoExcluir = () => true;

    const columns = useMemo(
        () => [
            state === 'view'
                ? {
                      Header: 'NOME',
                      accessor: 'nm_dominio_valor',
                      disableGroupBy: true
                  }
                : {
                      Header: 'NOME',
                      accessor: 'nm_dominio_valor',
                      dataType: 'text',
                      disableGroupBy: true
                  },

            state === 'view'
                ? {
                      Header: 'DESCRIÇÃO',
                      accessor: 'ds_dominio_valor',
                      disableGroupBy: true
                  }
                : {
                      Header: 'DESCRIÇÃO',
                      accessor: 'ds_dominio_valor',
                      dataType: 'longtext',
                      disableGroupBy: true
                  }
        ],
        [state]
    );

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

    console.log('values', values);
    console.log('dominios', dominios);

    if (!values) return <Loader />;

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard border={false} boxShadow>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MainCard title={title}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nm_dominio"
                                                    name="nm_dominio"
                                                    type="text"
                                                    label={<FormattedMessage id={'dominio.nm_dominio'} />}
                                                    error={Boolean(touched.nm_dominio && errors.nm_dominio)}
                                                    helperText={errors.nm_dominio && touched.nm_dominio ? errors.nm_dominio : null}
                                                    value={values?.nm_dominio}
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
                                                    id="ds_alias"
                                                    name="ds_alias"
                                                    type="text"
                                                    label={<FormattedMessage id={'dominio.ds_alias'} />}
                                                    error={Boolean(touched.ds_alias && errors.ds_alias)}
                                                    helperText={errors.ds_alias && touched.ds_alias ? errors.ds_alias : null}
                                                    value={values?.ds_alias}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                ></TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="ds_dominio"
                                                    name="ds_dominio"
                                                    type="text"
                                                    label={<FormattedMessage id={'dominio.ds_dominio'} />}
                                                    error={Boolean(touched.ds_dominio && errors.ds_dominio)}
                                                    helperText={errors.ds_dominio && touched.ds_dominio ? errors.ds_dominio : null}
                                                    value={values.ds_dominio}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        readOnly: view
                                                    }}
                                                ></TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                id="id_dominio_sup"
                                                fullWidth
                                                clearText="Limpar"
                                                closeText="Fechar"
                                                openText="Abrir"
                                                value={dominios?.find((item) => item.id_dominio === values.id_dominio_sup) ?? null}
                                                onBlur={handleBlur}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('id_dominio_sup', newValue?.id_dominio ?? null);
                                                    setFieldValue('id_dominio_valor_sup', null);
                                                    setDominioValor(newValue?.dominio_valor ?? []);
                                                }}
                                                options={dominios ?? []}
                                                autoHighlight
                                                isOptionEqualToValue={(option, value) => option.id_dominio === value?.id_dominio_sup}
                                                getOptionLabel={(option) => option.nm_dominio}
                                                renderOption={(props, option) => (
                                                    <Box component="li" {...props}>
                                                        <Typography>{option.nm_dominio}</Typography>
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Escolha um dominio superior"
                                                        name="id_dominio_sup"
                                                        label={<FormattedMessage id={'dominio.id_dominio_sup'} />}
                                                        inputProps={{
                                                            ...params.inputProps
                                                        }}
                                                        error={errors.id_dominio_sup && touched.id_dominio_sup}
                                                        helperText={
                                                            errors.id_dominio_sup && touched.id_dominio_sup && errors.id_dominio_sup
                                                        }
                                                    />
                                                )}
                                                noOptionsText="Nenhuma opção disponível"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                id="id_dominio_valor_sup"
                                                fullWidth
                                                clearText="Limpar"
                                                closeText="Fechar"
                                                openText="Abrir"
                                                value={
                                                    dominioValor?.find((item) => item.id_dominio_valor === values.id_dominio_valor_sup) ??
                                                    null
                                                }
                                                onBlur={handleBlur}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('id_dominio_valor_sup', newValue?.id_dominio_valor ?? null);
                                                }}
                                                options={dominioValor ?? []}
                                                disabled={!values.id_dominio_sup}
                                                autoHighlight
                                                isOptionEqualToValue={(option, value) =>
                                                    option.id_dominio_valor === value?.id_dominio_valor_sup
                                                }
                                                getOptionLabel={(option) => option.nm_dominio_valor}
                                                renderOption={(props, option) => (
                                                    <Box component="li" {...props}>
                                                        <Typography>{option.nm_dominio_valor}</Typography>
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Escolha um valor do dominio"
                                                        name="id_dominio_valor_sup"
                                                        label={<FormattedMessage id={'dominio.id_dominio_valor_sup'} />}
                                                        inputProps={{
                                                            ...params.inputProps
                                                        }}
                                                        error={errors.id_dominio_valor_sup && touched.id_dominio_valor_sup}
                                                        helperText={
                                                            errors.id_dominio_valor_sup &&
                                                            touched.id_dominio_valor_sup &&
                                                            errors.id_dominio_valor_sup
                                                        }
                                                    />
                                                )}
                                                noOptionsText="Nenhuma opção disponível"
                                            />
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>

                            {state === 'create' ? null : (
                                <Grid item xs={12}>
                                    <MainCard title="Valores">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <MainCard content={false}>
                                                    <TabelaNovaLinhaDominio
                                                        title=""
                                                        columns={columns}
                                                        data={values.dominio_valor ? values.dominio_valor : []}
                                                        showDelete={botaoExcluir()}
                                                        openDeleteModal={openDeleteModal}
                                                        load={load}
                                                        codDominio={values.id_dominio}
                                                        state={state}
                                                    />
                                                </MainCard>
                                            </Grid>
                                        </Grid>
                                    </MainCard>
                                </Grid>
                            )}
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
                                            Salvar
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

DominioForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

DominioForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default DominioForm;

import { Button, CircularProgress, Grid, MenuItem, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { useApiError } from 'errors/hooks/use-api-error';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { create, update } from 'store/reducers/aplicacao';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

const AplicacaoForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleApiError } = useApiError();

    const [view, setView] = useState(false);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/aplicacao');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nm_aplicacao: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'aplicacao.nm_aplicacao' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item

                    dispatch(update(values.id_aplicacao, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Aplicação atualizada com sucesso!',
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
                                    message: 'Aplicação criada com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/aplicacao/editar/${resp.id_aplicacao}`);
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

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard border={false} title={<FormattedMessage id={'aplicacao.title'} />} boxShadow>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    id="cd_aplicacao"
                                    name="cd_aplicacao"
                                    type="text"
                                    label={<FormattedMessage id={'aplicacao.cd_aplicacao'} />}
                                    fullWidth
                                    value={values.cd_aplicacao}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.cd_aplicacao && errors.cd_aplicacao)}
                                    helperText={errors.cd_aplicacao && touched.cd_aplicacao ? errors.cd_aplicacao : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="nm_aplicacao"
                                    name="nm_aplicacao"
                                    type="text"
                                    label={<FormattedMessage id={'aplicacao.nm_aplicacao'} />}
                                    fullWidth
                                    value={values.nm_aplicacao}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nm_aplicacao && errors.nm_aplicacao)}
                                    helperText={errors.nm_aplicacao && touched.nm_aplicacao ? errors.nm_aplicacao : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    id="st_ativo"
                                    name="st_ativo"
                                    select
                                    label={<FormattedMessage id={'aplicacao.st_ativo'} />}
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
                            <Grid item xs={2}>
                                <TextField
                                    id="dt_cadastro"
                                    name="dt_cadastro"
                                    type="datetime"
                                    label={<FormattedMessage id={'aplicacao.dt_cadastro'} />}
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

AplicacaoForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    title: PropTypes.string
};

export default AplicacaoForm;

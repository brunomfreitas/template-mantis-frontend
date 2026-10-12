import { Box, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { useApiError } from 'errors/hooks/use-api-error';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { create, update } from 'store/reducers/company';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

const CompanyForm = (props) => {
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
    }, [state]);

    const onCancel = () => {
        router.push('/core/company');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nr_cnpj: Yup.string()
                .max(14)
                .required(intl.formatMessage({ id: 'company.nr_cnpj' }) + intl.formatMessage({ id: 'isRequired' })),
            nm_company: Yup.string()
                .max(250)
                .required(intl.formatMessage({ id: 'company.nm_company' }) + intl.formatMessage({ id: 'isRequired' })),
            ds_sector: Yup.string()
                .max(250)
                .required(intl.formatMessage({ id: 'company.ds_sector' }) + intl.formatMessage({ id: 'isRequired' })),
            ds_subsector: Yup.string()
                .max(250)
                .required(intl.formatMessage({ id: 'company.ds_subsector' }) + intl.formatMessage({ id: 'isRequired' })),
            ds_segment: Yup.string()
                .max(250)
                .required(intl.formatMessage({ id: 'company.ds_segment' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    dispatch(update(values.id_company, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Company atualizada com sucesso!',
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
                    dispatch(create(values))
                        .then((resp) => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Company criada com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/company/editar/${resp.id_company}`);
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
                    <MainCard border={false} title={<FormattedMessage id={'company.title'} />} boxShadow>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    id="nr_cnpj"
                                    name="nr_cnpj"
                                    type="text"
                                    label={<FormattedMessage id={'company.nr_cnpj'} />}
                                    fullWidth
                                    value={values?.nr_cnpj}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nr_cnpj && errors.nr_cnpj)}
                                    helperText={errors.nr_cnpj && touched.nr_cnpj ? errors.nr_cnpj : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="nm_company"
                                    name="nm_company"
                                    type="text"
                                    label={<FormattedMessage id={'company.nm_company'} />}
                                    fullWidth
                                    value={values.nm_company}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nm_company && errors.nm_company)}
                                    helperText={errors.nm_company && touched.nm_company ? errors.nm_company : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    id="dt_cadastro"
                                    name="dt_cadastro"
                                    type="datetime"
                                    label={<FormattedMessage id={'company.dt_cadastro'} />}
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
                                    label={<FormattedMessage id={'company.st_ativo'} />}
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
                            <Grid item xs={4}>
                                <TextField
                                    id="ds_sector"
                                    name="ds_sector"
                                    type="text"
                                    label={<FormattedMessage id={'company.ds_sector'} />}
                                    fullWidth
                                    value={values.ds_sector}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.ds_sector && errors.ds_sector)}
                                    helperText={errors.ds_sector && touched.ds_sector ? errors.ds_sector : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ds_subsector"
                                    name="ds_subsector"
                                    type="text"
                                    label={<FormattedMessage id={'company.ds_subsector'} />}
                                    fullWidth
                                    value={values.ds_subsector}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.ds_subsector && errors.ds_subsector)}
                                    helperText={errors.ds_subsector && touched.ds_subsector ? errors.ds_subsector : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="ds_segment"
                                    name="ds_segment"
                                    type="text"
                                    label={<FormattedMessage id={'company.ds_segment'} />}
                                    fullWidth
                                    value={values.ds_segment}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.ds_segment && errors.ds_segment)}
                                    helperText={errors.ds_segment && touched.ds_segment ? errors.ds_segment : null}
                                    InputProps={{
                                        readOnly: state === 'view'
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

CompanyForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    title: PropTypes.string
};

export default CompanyForm;

import { Autocomplete, Box, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { useApiError } from 'errors/hooks/use-api-error';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { useSelector } from 'store/index';
import { fetch as fetchByAlias } from 'store/reducers/dominio';
import { create, update } from 'store/reducers/empresa';
import { fetch as fetchOrg } from 'store/reducers/organizacao';
import { fetch as fetchPes } from 'store/reducers/pessoa';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

const EmpresaForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const fieldRefs = useRef({});
    const { handleApiError } = useApiError();

    const { list: organizacoes } = useSelector((state) => state.organizacao);
    const { list: dominios } = useSelector((state) => state.dominio);
    const { list: responsaveis } = useSelector((state) => state.pessoa);

    const [view, setView] = useState(false);
    const [tipoEmpresa, setTipoEmpresa] = useState([]);
    const [sites, setSites] = useState([]);

    useEffect(() => {
        dispatch(fetchOrg());
        dispatch(fetchByAlias());
        dispatch(fetchPes());
        dispatch(fetchByAlias());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (dominios.length > 0) {
            const tipo_empresa = dominios?.find((item) => item.ds_alias === 'TIPO_EMPRESA');
            setTipoEmpresa(tipo_empresa ? tipo_empresa.dominio_valor : []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dominios]);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        if (state === 'edit' && organizacoes.length > 0) {
            const organizacao = organizacoes?.find((item) => item.id_organizacao === values.id_organizacao);

            setSites(organizacao ? organizacao.site : []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, organizacoes]);

    const onCancel = () => {
        router.push('/core/empresa');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nm_empresa: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'empresa.nm_empresa' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item

                    dispatch(update(values.id_empresa, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Empresa atualizada com sucesso!',
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
                                    message: 'Empresa criada com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/empresa/editar/${resp.id_empresa}`);
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

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard border={false} title={<FormattedMessage id={'empresa.title'} />} boxShadow>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    id="nr_cnpj"
                                    name="nr_cnpj"
                                    type="text"
                                    label={<FormattedMessage id={'empresa.nr_cnpj'} />}
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
                                    id="nm_empresa"
                                    name="nm_empresa"
                                    type="text"
                                    label={<FormattedMessage id={'empresa.nm_empresa'} />}
                                    fullWidth
                                    value={values.nm_empresa}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nm_empresa && errors.nm_empresa)}
                                    helperText={errors.nm_empresa && touched.nm_empresa ? errors.nm_empresa : null}
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
                                    label={<FormattedMessage id={'empresa.dt_cadastro'} />}
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
                                    label={<FormattedMessage id={'empresa.st_ativo'} />}
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
                                    id="nm_email"
                                    name="nm_email"
                                    type="text"
                                    label={<FormattedMessage id={'empresa.nm_email'} />}
                                    fullWidth
                                    value={values.nm_email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nm_email && errors.nm_email)}
                                    helperText={errors.nm_email && touched.nm_email ? errors.nm_email : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="nr_telefone"
                                    name="nr_telefone"
                                    type="text"
                                    label={<FormattedMessage id={'empresa.nr_telefone'} />}
                                    fullWidth
                                    value={values.nr_telefone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nr_telefone && errors.nr_telefone)}
                                    helperText={errors.nr_telefone && touched.nr_telefone ? errors.nr_telefone : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="id_organizacao"
                                    fullWidth
                                    value={organizacoes.find((site) => site.id_organizacao === values.id_organizacao) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_organizacao', newValue?.id_organizacao ?? '');
                                        setSites(newValue?.site ?? []);
                                    }}
                                    options={organizacoes}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_organizacao === value?.id_site ?? null}
                                    getOptionLabel={(option) => option.nm_organizacao}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_organizacao}</Typography>
                                        </Box>
                                    )}
                                    inputProps={{
                                        readOnly: state === 'view'
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha uma Organização"
                                            name="id_organizacao"
                                            inputRef={(el) => (fieldRefs.current.id_organizacao = el)} // Adicione a referência
                                            label={<FormattedMessage id={'empresa.id_organizacao'} />}
                                            error={Boolean(touched.id_organizacao && errors.id_organizacao)}
                                            helperText={errors.id_organizacao && touched.id_organizacao ? errors.id_organizacao : null}
                                            inputProps={{
                                                ...params.inputProps
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="id_site"
                                    fullWidth
                                    value={sites.find((site) => site.id_site === values.id_site) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_site', newValue ? newValue.id_site : '');
                                    }}
                                    options={sites}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_site === (value ? value.id_site : null)}
                                    getOptionLabel={(option) => option.nm_site}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_site}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha um Site"
                                            name="id_site"
                                            inputRef={(el) => (fieldRefs.current.id_site = el)} // Adicione a referência
                                            label={<FormattedMessage id={'empresa.id_site'} />}
                                            error={Boolean(touched.id_site && errors.id_site)}
                                            helperText={errors.id_site && touched.id_site ? errors.id_site : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="id_tipo_empresa"
                                    fullWidth
                                    value={tipoEmpresa.find((item) => item.id_dominio_valor === values.id_tipo_empresa) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_tipo_empresa', newValue?.id_dominio_valor ?? null);
                                    }}
                                    options={tipoEmpresa}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_dominio_valor === (value?.id_tipo_empresa ?? null)}
                                    getOptionLabel={(option) => option.ds_dominio_valor}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.ds_dominio_valor}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha um Tipo de Empresa"
                                            name="id_tipo_empresa"
                                            inputRef={(el) => (fieldRefs.current.id_tipo_empresa = el)} // Adicione a referência
                                            label={<FormattedMessage id={'empresa.id_tipo_empresa'} />}
                                            error={Boolean(touched.id_tipo_empresa && errors.id_tipo_empresa)}
                                            helperText={errors.id_tipo_empresa && touched.id_tipo_empresa ? errors.id_tipo_empresa : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="id_pessoa_responsavel"
                                    fullWidth
                                    value={responsaveis.find((item) => item.id_pessoa === values.id_pessoa_responsavel) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_pessoa_responsavel', newValue?.id_pessoa ?? null);
                                    }}
                                    options={responsaveis}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_pessoa === (value?.id_pessoa_responsavel ?? null)}
                                    getOptionLabel={(option) => option.nm_pessoa}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_pessoa}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha um Responsável"
                                            name="id_pessoa_responsavel"
                                            inputRef={(el) => (fieldRefs.current.id_pessoa_responsavel = el)} // Adicione a referência
                                            label={<FormattedMessage id={'empresa.id_pessoa_responsavel'} />}
                                            error={Boolean(touched.id_pessoa_responsavel && errors.id_pessoa_responsavel)}
                                            helperText={
                                                errors.id_pessoa_responsavel && touched.id_pessoa_responsavel
                                                    ? errors.id_pessoa_responsavel
                                                    : null
                                            }
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
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

EmpresaForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    title: PropTypes.string
};

export default EmpresaForm;

import { Autocomplete, Box, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { useApiError } from 'errors';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { fetch as fetchDom } from 'store/reducers/dominio';
import { fetch as fetchOrg } from 'store/reducers/organizacao';
import { create, update } from 'store/reducers/pessoa';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import { getErrorMessage } from 'utils/getErrorMessage';
import { getPessoaValidationMessages } from 'validation/messages/pessoa.messages';
import * as Yup from 'yup';

const PessoaForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const fieldRefs = useRef({});
    const { handleApiError } = useApiError();

    const { list: organizacoes } = useSelector((state) => state.organizacao);
    const { list: dominios } = useSelector((state) => state.dominio);
    const [sites, setSites] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [view, setView] = useState(false);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        if (state === 'edit' && organizacoes.length > 0) {
            const organizacao = organizacoes?.find((item) => item.id_organizacao === values.id_organizacao);

            setSites(organizacao ? organizacao.site : []);
        }

        const genero = dominios.find((item) => item.ds_alias === 'GENEROS');
        setGeneros(genero?.dominio_valor);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, organizacoes, dominios]);

    useEffect(() => {
        dispatch(fetchOrg());
        dispatch(fetchDom());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCancel = () => {
        router.push('/core/pessoa');
    };

    const validationMessages = getPessoaValidationMessages(intl);

    const getValidationSchema = () => {
        return Yup.object().shape({
            nr_cpf: Yup.string().max(14).required(validationMessages.nr_cpf),
            nm_pessoa: Yup.string().max(255).required(validationMessages.nm_pessoa),
            id_genero: Yup.number().required(validationMessages.id_genero),
            dt_nascimento: Yup.string().max(255).required(validationMessages.dt_nascimento),
            nm_email: Yup.string().email().required(validationMessages.nm_email)
        });
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: getValidationSchema(),
        onSubmit: async (values) => {
            try {
                console.log('state onSubmit', state);
                console.log('values onSubmit', values);
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item
                    dispatch(update(values.id_pessoa, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Pessoa atualizada com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                        })
                        .catch((error) => {
                            console.log('error', error);
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: getErrorMessage(error, validationMessages),
                                    variant: 'alert',
                                    alert: {
                                        color: 'error'
                                    }
                                })
                            );
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                } else if (state === 'create') {
                    // Se estiver no modo de criação, crie um novo item
                    await dispatch(create(values))
                        .then((resp) => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Pessoa criada com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/pessoa/editar/${resp.id_pessoa}`);
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
                    <MainCard border={false} title={<FormattedMessage id={'pessoa.title'} />} boxShadow>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    id="nr_cpf"
                                    name="nr_cpf"
                                    type="text"
                                    label={<FormattedMessage id={'pessoa.nr_cpf'} />}
                                    fullWidth
                                    value={values.nr_cpf}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nr_cpf && errors.nr_cpf)}
                                    helperText={errors.nr_cpf && touched.nr_cpf ? errors.nr_cpf : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="nm_pessoa"
                                    name="nm_pessoa"
                                    type="text"
                                    label={<FormattedMessage id={'pessoa.nm_pessoa'} />}
                                    fullWidth
                                    value={values.nm_pessoa}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.nm_pessoa && errors.nm_pessoa)}
                                    helperText={errors.nm_pessoa && touched.nm_pessoa ? errors.nm_pessoa : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            {state === 'create' ? (
                                <Grid item xs={2}>
                                    <TextField
                                        id="dt_nascimento"
                                        name="dt_nascimento"
                                        type="text"
                                        label={<FormattedMessage id={'pessoa.dt_nascimento'} />}
                                        fullWidth
                                        value={values?.dt_nascimento}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.dt_nascimento && errors.dt_nascimento)}
                                        helperText={errors.dt_nascimento && touched.dt_nascimento ? errors.dt_nascimento : null}
                                        InputProps={{
                                            readOnly: state === 'view'
                                        }}
                                    />
                                </Grid>
                            ) : (
                                <>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="dt_nascimento"
                                            name="dt_nascimento"
                                            type="text"
                                            label={<FormattedMessage id={'pessoa.dt_nascimento'} />}
                                            fullWidth
                                            value={isoToFormat(values?.dt_nascimento, DATETIME_BR)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.dt_nascimento && errors.dt_nascimento)}
                                            helperText={errors.dt_nascimento && touched.dt_nascimento ? errors.dt_nascimento : null}
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
                                            label={<FormattedMessage id={'pessoa.st_ativo'} />}
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
                            <Grid item xs={4}>
                                <Autocomplete
                                    id="id_genero"
                                    fullWidth
                                    value={generos?.find((item) => item.id_dominio_valor === values.id_genero) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_genero', newValue?.id_dominio_valor ?? null);
                                    }}
                                    options={generos}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_dominio_valor === value?.id_dominio_valor}
                                    getOptionLabel={(option) => option.ds_dominio_valor}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.ds_dominio_valor}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha um Genero"
                                            name="id_genero"
                                            inputRef={(el) => (fieldRefs.current.id_genero = el)} // Adicione a referência
                                            label={<FormattedMessage id={'pessoa.id_genero'} />}
                                            error={Boolean(touched.id_genero && errors.id_genero)}
                                            helperText={errors.id_genero && touched.id_genero ? errors.id_genero : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="nm_email"
                                    name="nm_email"
                                    type="text"
                                    label={<FormattedMessage id={'pessoa.nm_email'} />}
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
                                    label={<FormattedMessage id={'pessoa.nr_telefone'} />}
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                                            label={<FormattedMessage id={'pessoa.id_site'} />}
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

PessoaForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    title: PropTypes.string
};

export default PessoaForm;

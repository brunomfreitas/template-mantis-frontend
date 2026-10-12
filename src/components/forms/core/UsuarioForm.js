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
import { fetch } from 'store/reducers/pessoa';
import { openSnackbar } from 'store/reducers/snackbar';
import { create, update } from 'store/reducers/usuario';

import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

const UsuarioForm = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { initialValues, title, state } = props;

    console.log('UsuarioForm initialValues', initialValues);

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const fieldRefs = useRef({});
    const { handleApiError } = useApiError();

    const [view, setView] = useState(false);
    const [pessoa, setPessoa] = useState({});

    const { list: pessoas } = useSelector((state) => state.pessoa);

    useEffect(() => {
        dispatch(fetch());
        setPessoa(initialValues.pessoa);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/usuario');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            login: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'pessoa.nm_pessoa' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item

                    dispatch(
                        update(values.id_usuario, {
                            id_pessoa: values.id_pessoa,
                            login: values.login,
                            password: values.password,
                            st_ativo: values.st_ativo
                        })
                    )
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Usuário atualizado com sucesso !',
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
                                    message: 'Usuário criado com sucesso !',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/usuario/editar/${resp.id_usuario}`);
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
                    <MainCard border={false} title={<FormattedMessage id={'usuario.title'} />} boxShadow>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="id_pessoa"
                                    fullWidth
                                    value={pessoas.find((item) => item.id_pessoa === values.id_pessoa) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_pessoa', newValue?.id_pessoa ?? null);
                                        setPessoa(newValue ?? null);
                                    }}
                                    options={pessoas}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_pessoa === (value?.id_pessoa ?? null)}
                                    getOptionLabel={(option) => option.nm_pessoa}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_pessoa}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha uma pessoa"
                                            name="id_pessoa"
                                            inputRef={(el) => (fieldRefs.current.id_pessoa = el)} // Adicione a referência
                                            label={<FormattedMessage id={'usuario.id_pessoa'} />}
                                            error={Boolean(touched.id_pessoa && errors.id_pessoa)}
                                            helperText={errors.id_pessoa && touched.id_pessoa ? errors.id_pessoa : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={state === 'create' ? 3 : 4}>
                                <TextField
                                    id="login"
                                    name="login"
                                    type="text"
                                    label={<FormattedMessage id={'usuario.login'} />}
                                    fullWidth
                                    value={values.login}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.login && errors.login)}
                                    helperText={errors.login && touched.login ? errors.login : null}
                                    InputProps={{
                                        readOnly: state === 'view'
                                    }}
                                />
                            </Grid>
                            {state === 'create' ? (
                                <Grid item xs={3}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        type="text"
                                        label={<FormattedMessage id={'usuario.password'} />}
                                        fullWidth
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={errors.password && touched.password ? errors.password : null}
                                        InputProps={{
                                            readOnly: state === 'view'
                                        }}
                                    />
                                </Grid>
                            ) : (
                                <Grid item xs={2}>
                                    <TextField
                                        id="dt_cadastro"
                                        name="dt_cadastro"
                                        type="datetime"
                                        label={<FormattedMessage id={'usuario.dt_cadastro'} />}
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
                            )}
                            <Grid item xs={2}>
                                <TextField
                                    id="nr_cpf"
                                    name="nr_cpf"
                                    type="text"
                                    label={<FormattedMessage id={'pessoa.nr_cpf'} />}
                                    fullWidth
                                    value={pessoa?.nr_cpf}
                                    // onBlur={handleBlur}
                                    // onChange={handleChange}
                                    // error={Boolean(touched.nr_cpf && errors.nr_cpf)}
                                    // helperText={errors.nr_cpf && touched.nr_cpf ? errors.nr_cpf : null}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="nm_pessoa"
                                    name="nm_pessoa"
                                    type="text"
                                    label={<FormattedMessage id={'pessoa.nm_pessoa'} />}
                                    fullWidth
                                    value={pessoa?.nm_pessoa}
                                    // onBlur={handleBlur}
                                    // onChange={handleChange}
                                    // error={Boolean(touched.nm_pessoa && errors.nm_pessoa)}
                                    // helperText={errors.nm_pessoa && touched.nm_pessoa ? errors.nm_pessoa : null}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            {state !== 'create' && (
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

UsuarioForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    title: PropTypes.string
};

export default UsuarioForm;

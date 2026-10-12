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
import { create, update } from 'store/reducers/pergunta';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import * as Yup from 'yup';

const PerguntaForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const fieldRefs = useRef({});
    const { handleApiError } = useApiError();

    const { list: dominios } = useSelector((state) => state.dominio);

    const [view, setView] = useState(false);
    const [tipoResposta, setTipoResposta] = useState([]);
    const [categPergunta, setCategPergunta] = useState([]);

    useEffect(() => {
        dispatch(
            fetchByAlias({
                pageSize: 'all'
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!dominios?.length) return;

        const domPai = dominios.find((item) => item.ds_alias === 'TIPO_RESPOSTA');

        const catPergunta = dominios.find((item) => item.ds_alias === 'CT_PERGUNTA');

        setCategPergunta(catPergunta.dominio_valor);

        if (!domPai) return;

        // const tipoRespostas = dominios.filter((item) => item.id_dominio_sup === domPai.id_dominio);
        const tipoRespostas = dominios.filter((item) => item.id_dominio_sup === domPai.id_dominio);

        setTipoResposta(tipoRespostas);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dominios]);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/pergunta');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            ds_pergunta: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'pergunta.ds_pergunta' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item

                    dispatch(update(values.id_pergunta, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Pergunta atualizada com sucesso!',
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
                                    message: 'Pergunta criada com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push(`/core/pergunta/editar/${resp.id_pergunta}`);
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
                    <MainCard border={false} title={<FormattedMessage id={'pergunta.title'} />} boxShadow>
                        <Grid container spacing={2}>
                            {state !== 'create' && (
                                <Grid item xs={2}>
                                    <TextField
                                        id="id_pergunta"
                                        name="id_pergunta"
                                        type="text"
                                        label={<FormattedMessage id={'pergunta.id_pergunta'} />}
                                        fullWidth
                                        value={values?.id_pergunta}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.id_pergunta && errors.id_pergunta)}
                                        helperText={errors.id_pergunta && touched.id_pergunta ? errors.id_pergunta : null}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={state === 'create' ? 6 : 2}>
                                <Autocomplete
                                    id="ct_pergunta"
                                    fullWidth
                                    value={categPergunta.find((item) => item.id_dominio_valor === values.ct_pergunta) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('ct_pergunta', newValue?.id_dominio_valor ?? null);
                                    }}
                                    options={categPergunta}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_dominio_valor === (value?.ct_pergunta ?? null)}
                                    getOptionLabel={(option) => option.nm_dominio_valor}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_dominio_valor}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha uma opção de resposta"
                                            name="ct_pergunta"
                                            inputRef={(el) => (fieldRefs.current.ct_pergunta = el)} // Adicione a referência
                                            label={<FormattedMessage id={'pergunta.ct_pergunta'} />}
                                            error={Boolean(touched.ct_pergunta && errors.ct_pergunta)}
                                            helperText={errors.ct_pergunta && touched.ct_pergunta ? errors.ct_pergunta : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={state === 'create' ? 6 : 4}>
                                <Autocomplete
                                    id="id_resposta"
                                    fullWidth
                                    value={tipoResposta.find((item) => item.id_dominio === values.id_resposta) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        setFieldValue('id_resposta', newValue?.id_dominio ?? null);
                                    }}
                                    options={tipoResposta}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_dominio === (value?.id_resposta ?? null)}
                                    getOptionLabel={(option) => option.nm_dominio}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_dominio}</Typography>
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha uma opção de resposta"
                                            name="id_resposta"
                                            inputRef={(el) => (fieldRefs.current.id_resposta = el)} // Adicione a referência
                                            label={<FormattedMessage id={'pergunta.id_resposta'} />}
                                            error={Boolean(touched.id_resposta && errors.id_resposta)}
                                            helperText={errors.id_resposta && touched.id_resposta ? errors.id_resposta : null}
                                            inputProps={{
                                                ...params.inputProps,
                                                readOnly: state === 'view'
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            {state !== 'create' && (
                                <>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="dt_cadastro"
                                            name="dt_cadastro"
                                            type="datetime"
                                            label={<FormattedMessage id={'pergunta.dt_cadastro'} />}
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
                                            label={<FormattedMessage id={'pergunta.st_ativo'} />}
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
                                <TextField
                                    id="ds_pergunta"
                                    name="ds_pergunta"
                                    type="text"
                                    label={<FormattedMessage id={'pergunta.ds_pergunta'} />}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={Infinity}
                                    value={values.ds_pergunta}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.ds_pergunta && errors.ds_pergunta)}
                                    helperText={errors.ds_pergunta && touched.ds_pergunta ? errors.ds_pergunta : null}
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

PerguntaForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    title: PropTypes.string
};

export default PerguntaForm;

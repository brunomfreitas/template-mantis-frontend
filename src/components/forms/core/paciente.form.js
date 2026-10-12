import { MailOutlined, PhoneOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Grid, MenuItem, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { formatISO } from 'date-fns';
import { useApiError } from 'errors/hooks/use-api-error';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PatternFormat } from 'react-number-format';
import { useDispatch } from 'store';
import { editar, novo } from 'store/reducers/paciente';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';

// ==============================|| PACIENTES ||============================== //

const PacienteForm = (props) => {
    const { initialValues, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleApiError } = useApiError();

    const sexo = [
        { ID: 'F', NOME: 'Feminino' },
        { ID: 'M', NOME: 'Masculino' }
    ];

    const maxDate = new Date();
    maxDate.getDate();

    const [view, setView] = useState(false);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/paciente');
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            nm_paciente: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'paciente.nm_paciente' }) + intl.formatMessage({ id: 'isRequired' })),
            dt_nascimento: Yup.date(),
            //required(intl.formatMessage({ id: 'paciente.dt_nascimento' }) + intl.formatMessage({ id: 'isRequired' })),
            nm_responsavel: Yup.string()
                .max(255)
                .required(intl.formatMessage({ id: 'paciente.nm_responsavel' }) + intl.formatMessage({ id: 'isRequired' }))
        }),
        onSubmit: (values) => {
            try {
                values.dt_nascimento = formatISO(new Date(values.dt_nascimento));

                if (state === 'edit') {
                    // Se estiver no modo de edição, atualize o item
                    dispatch(editar(values.id_paciente, values))
                        .then(() => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Paciente armazenado com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push('/core/paciente');
                        })
                        .catch((err) => {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: `Houve um erro ao processar o envio do formulário: ${err}`,
                                    variant: 'alert',
                                    alert: {
                                        color: 'error'
                                    },
                                    close: false
                                })
                            );
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
                                    message: 'Paciente criado com sucesso!',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    }
                                })
                            );
                            router.push('/core/paciente');
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
        <Page title={intl.formatMessage({ id: 'paciente.title' })}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard border={false} boxShadow>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <MainCard title={intl.formatMessage({ id: 'paciente' })}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <PatternFormat
                                                            format="###.###.###-##"
                                                            mask="_"
                                                            fullWidth
                                                            customInput={TextField}
                                                            id="nr_cpf"
                                                            name="nr_cpf"
                                                            data-testid="nr_cpf"
                                                            type="text"
                                                            label={<FormattedMessage id={'paciente.nr_cpf'} />}
                                                            value={values?.nr_cpf || ''}
                                                            error={Boolean(touched.nr_cpf && errors.nr_cpf)}
                                                            helperText={errors.nr_cpf && touched.nr_cpf ? errors.nr_cpf : null}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            InputProps={{
                                                                readOnly: view
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <TextField
                                                            id="dt_nascimento"
                                                            name="dt_nascimento"
                                                            data-testid="dt_nascimento"
                                                            type="date"
                                                            label={<FormattedMessage id={'paciente.dt_nascimento'} />}
                                                            error={Boolean(touched.dt_nascimento && errors.dt_nascimento)}
                                                            helperText={
                                                                errors.dt_nascimento && touched.dt_nascimento ? errors.dt_nascimento : null
                                                            }
                                                            value={values?.dt_nascimento}
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
                                                            id="nm_paciente"
                                                            name="nm_paciente"
                                                            data-testid="nm_paciente"
                                                            type="text"
                                                            label={<FormattedMessage id={'paciente.nm_paciente'} />}
                                                            error={Boolean(touched.nm_paciente && errors.nm_paciente)}
                                                            helperText={
                                                                errors.nm_paciente && touched.nm_paciente ? errors.nm_paciente : null
                                                            }
                                                            value={values?.nm_paciente}
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
                                                            id="sexo"
                                                            name="cs_genero"
                                                            data-testid="cs_genero"
                                                            select
                                                            label={<FormattedMessage id={'paciente.cs_genero'} />}
                                                            error={Boolean(touched.cs_genero && errors.cs_genero)}
                                                            helperText={errors.cs_genero && touched.cs_genero ? errors.cs_genero : null}
                                                            value={values?.cs_genero || ''}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            InputProps={{
                                                                readOnly: view
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Selecione</em>
                                                            </MenuItem>
                                                            {sexo.map((valor) => (
                                                                <MenuItem key={valor.ID} value={valor.ID}>
                                                                    {valor.NOME}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </MainCard>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MainCard title="Responsável">
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={12}>
                                                    <Stack spacing={1}>
                                                        <TextField
                                                            id="nm_responsavel"
                                                            name="nm_responsavel"
                                                            data-testid="nm_responsavel"
                                                            type="text"
                                                            label={<FormattedMessage id={'paciente.nm_responsavel'} />}
                                                            error={Boolean(touched.nm_responsavel && errors.nm_responsavel)}
                                                            helperText={
                                                                errors.nm_responsavel && touched.nm_responsavel
                                                                    ? errors.nm_responsavel
                                                                    : null
                                                            }
                                                            value={values?.nm_responsavel}
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
                                                            id="nm_email"
                                                            name="nm_email"
                                                            data-testid="nm_email"
                                                            type="email"
                                                            label={<FormattedMessage id={'paciente.nm_email'} />}
                                                            error={Boolean(touched.nm_email && errors.nm_email)}
                                                            helperText={errors.nm_email && touched.nm_email ? errors.nm_email : null}
                                                            value={values?.nm_email}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            InputProps={{
                                                                readOnly: view,
                                                                startAdornment: <MailOutlined />
                                                            }}
                                                        ></TextField>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <PatternFormat
                                                            format="(##) #####-####"
                                                            mask="_"
                                                            fullWidth
                                                            value={values?.nr_telefone}
                                                            customInput={TextField}
                                                            placeholder="Tel. com DDD"
                                                            id="nr_telefone"
                                                            name="nr_telefone"
                                                            data-testid="nr_telefone"
                                                            type="text"
                                                            label={<FormattedMessage id={'paciente.nr_telefone'} />}
                                                            error={Boolean(touched.nr_telefone && errors.nr_telefone)}
                                                            helperText={
                                                                errors.nr_telefone && touched.nr_telefone ? errors.nr_telefone : null
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            InputProps={{
                                                                readOnly: view,
                                                                startAdornment: <PhoneOutlined />
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </MainCard>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                            <Button variant="outlined" color="secondary" onClick={onCancel}>
                                                {view ? 'Voltar' : 'Cancelar'}
                                            </Button>
                                            {view ? null : (
                                                <Button
                                                    data-testid="botao_salvar"
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
                            </Grid>
                        </Grid>
                    </MainCard>
                </Form>
            </FormikProvider>
        </Page>
    );
};

PacienteForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

PacienteForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default PacienteForm;

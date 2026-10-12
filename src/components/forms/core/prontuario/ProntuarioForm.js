import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Autocomplete, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { prontuarioCreateDTO } from 'dto/prontuario/prontuario-create-dto';
import { prontuarioUpdateDTO } from 'dto/prontuario/prontuario-update-dto';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { useSelector } from 'store/index';
import { fetch as fetchEsc } from 'store/reducers/dominio';
import { fetch as fetchPes } from 'store/reducers/pessoa';
import { update } from 'store/reducers/prontuario';
import { update as updateQuestionario } from 'store/reducers/prontuario-pergunta';
import { openSnackbar } from 'store/reducers/snackbar';
import { DATETIME_BR, isoToFormat } from 'utils/dateUtils';
import { getErrorMessage } from 'utils/getErrorMessage';
import { getProntuarioValidationMessages } from 'validation/messages/prontuario.messages';
import * as Yup from 'yup';
import TabExamesForm from './TabExamesForm';
import TabProntuarioForm from './TabProntuarioForm';
import TabResultadoForm from './TabResultadoForm';
import TabTriagemForm from './TabTriagemForm';

dayjs.extend(duration);

const ProntuarioForm = (props) => {
    const { initialValues, title, state } = props;

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const fieldRefs = useRef({});

    const { list: pessoas } = useSelector((state) => state.pessoa);
    const { list: dominios } = useSelector((state) => state.dominio);

    const [view, setView] = useState(false);
    const [tab, setTab] = useState('1');

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
        dispatch(fetchPes());
        dispatch(
            fetchEsc({
                pageSize: 'all'
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    const onCancel = () => {
        router.push('/core/prontuario');
    };

    const validationMessages = getProntuarioValidationMessages(intl);

    const getValidationSchema = (tab) => {
        switch (tab) {
            case '1':
                return Yup.object().shape({
                    id_escola: Yup.number().required(validationMessages.id_escola),
                    nm_responsavel: Yup.string().required(validationMessages.nm_responsavel),
                    nr_telefone_responsavel: Yup.string().required(validationMessages.nr_telefone_responsavel),
                    ds_declaracao_responsavel: Yup.string().required(validationMessages.ds_declaracao_responsavel)
                });

            case '2':
                return Yup.object().shape({
                    id_paciente: Yup.number().required(validationMessages.id_paciente)
                });

            default:
                return Yup.object().shape({});
        }
    };

    useEffect(() => {
        formik.setErrors({});
        formik.setTouched({});
    }, [tab]);

    const formProntuario = (data) => {
        if (state === 'edit') {
            // Se estiver no modo de edição, atualize o item
            dispatch(update(data?.id_prontuario, prontuarioUpdateDTO(data)))
                .then(() => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Prontuario atualizado com sucesso!',
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
                });
        } else if (state === 'create') {
            // Se estiver no modo de criação, crie um novo item
            dispatch(create(prontuarioCreateDTO(data)))
                .then((resp) => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Organização criada com sucesso!',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            }
                        })
                    );
                    router.push(`/core/prontuario/editar/${resp.id_prontuario}`);
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
                });
        }
    };

    const formQuestionario = (data) => {
        data.prontuario_pergunta?.map((item) =>
            dispatch(
                updateQuestionario(item.id_prontuario_pergunta, {
                    id_prontuario_pergunta: item.id_prontuario_pergunta,
                    id_prontuario: item.id_prontuario,
                    id_pergunta: item.id_pergunta,
                    id_resposta: item.id_resposta
                })
            )
        );
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: getValidationSchema(tab),
        onSubmit: async (values) => {
            try {
                console.log('TAB: ', tab);
                console.log('values', values);
                formProntuario(values);
                formQuestionario(values);
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
                await load();
            }
        }
    });

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

    //===================== DATA DE NASCIMENTO =================\\
    // Dentro do componente, onde você está exibindo a diferença entre datas
    const dataAtual = dayjs();
    const paciente = pessoas.find((item) => item.id_pessoa === values.id_paciente);
    const dataNascimento = dayjs(paciente?.dt_nascimento);

    // Calcule a diferença entre as datas
    const diff = dayjs.duration(dataAtual.diff(dataNascimento));

    // Exiba a diferença em anos, meses e dias
    const anos = diff.years();
    const meses = diff.months();
    const dias = diff.days();

    const resetPersonalForm = () => {
        console.log('passou por aqui !!!!!');
        setFieldValue('id_escola', null);
        setFieldValue('cs_serie', null);
        setFieldValue('cs_turno', null);
        setFieldValue('nm_responsavel', null);
        setFieldValue('nr_telefone_responsavel', null);
    };

    console.log('values', values);

    return (
        <Page title={title}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <MainCard border={false} title={'Ficha Cadastral'} boxShadow>
                        <Grid container spacing={2}>
                            {state === 'create' ? null : (
                                <Grid item xs={1}>
                                    <TextField
                                        id="id_prontuario"
                                        name="id_prontuario"
                                        type="text"
                                        label={<FormattedMessage id={'prontuario.id_prontuario'} />}
                                        fullWidth
                                        value={values?.id_prontuario}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Grid>
                            )}
                            <Grid item xs={5}>
                                <Autocomplete
                                    id="id_paciente"
                                    fullWidth
                                    value={pessoas.find((item) => item.id_pessoa === values.id_paciente) || null}
                                    onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        console.log('newValue', newValue);
                                        setFieldValue('id_paciente', newValue?.id_pessoa ?? '');
                                        resetPersonalForm();
                                    }}
                                    options={pessoas}
                                    autoHighlight
                                    isOptionEqualToValue={(option, value) => option.id_paciente === value?.id_pessoa ?? null}
                                    getOptionLabel={(option) => option.nm_pessoa}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Typography>{option.nm_pessoa}</Typography>
                                        </Box>
                                    )}
                                    inputProps={{
                                        readOnly: state === 'view'
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Escolha um Paciente"
                                            name="id_paciente"
                                            inputRef={(el) => (fieldRefs.current.id_paciente = el)} // Adicione a referência
                                            label={<FormattedMessage id={'prontuario.id_paciente'} />}
                                            error={Boolean(touched.id_paciente && errors.id_paciente)}
                                            helperText={errors.id_paciente && touched.id_paciente ? errors.id_paciente : null}
                                            inputProps={{
                                                ...params.inputProps
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="idade"
                                        name="idade"
                                        label={<FormattedMessage id={'prontuario.idade'} />}
                                        value={`${anos} anos ${meses} meses ${dias} dias`}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                </Stack>
                            </Grid>

                            {state === 'create' ? null : (
                                <>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="dh_inicio_atendimento"
                                            name="dh_inicio_atendimento"
                                            type="datetime"
                                            label={<FormattedMessage id={'prontuario.dh_inicio_atendimento'} />}
                                            fullWidth
                                            value={isoToFormat(values?.dh_inicio_atendimento, DATETIME_BR)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.dh_inicio_atendimento && errors.dh_inicio_atendimento)}
                                            helperText={
                                                errors.dh_inicio_atendimento && touched.dh_inicio_atendimento
                                                    ? errors.dh_inicio_atendimento
                                                    : null
                                            }
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <TextField
                                            id="st_ativo"
                                            name="st_ativo"
                                            select
                                            label={<FormattedMessage id={'prontuario.st_ativo'} />}
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
                                                <Tab label="Prontuário" value="1" />
                                                <Tab label="Triagem" value="2" />
                                                <Tab label="Exame" value="3" />
                                                <Tab label="Resultado" value="4" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            {initialValues && (
                                                <TabProntuarioForm initialValues={values} dominios={dominios} state={state} />
                                            )}
                                        </TabPanel>
                                        <TabPanel value="2">{initialValues && <TabTriagemForm state={state} anos={anos} />}</TabPanel>
                                        <TabPanel value="3">
                                            {initialValues && <TabExamesForm data={initialValues} state={state} />}
                                        </TabPanel>
                                        <TabPanel value="4">{initialValues && <TabResultadoForm state={state} anos={anos} />}</TabPanel>
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
                                            {state === 'edit' ? 'Salvar' : 'Cadastrar'}
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

ProntuarioForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    state: PropTypes.string
};

ProntuarioForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ProntuarioForm;

import { CloseOutlined } from '@ant-design/icons';
import {
    Autocomplete,
    Box,
    Chip,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Form, useFormikContext } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

dayjs.extend(duration);
// ==============================|| TabProntuarioForm ||============================== //

const TabProntuarioForm = (props) => {
    const { dominios, state, tela } = props;

    const { values, errors, touched, handleSubmit, handleBlur, handleChange, setFieldValue, getFieldProps } = useFormikContext();

    const intl = useIntl();
    const router = useRouter();
    const dispatch = useDispatch();
    const fieldRefs = useRef({});

    const [escolas, setEscolas] = useState([]);
    const [series, setSeries] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [statusProntuario, setStatusProntuario] = useState([]);

    const [encaminhamento, setEncaminhamento] = useState(true);

    useEffect(() => {
        if (!dominios?.length) return;

        const stProntuario = dominios.find((item) => item.ds_alias === 'ST_PRONTUARIO');
        setStatusProntuario(stProntuario.dominio_valor);

        const escola = dominios.find((item) => item.ds_alias === 'ESCOLAS');
        setEscolas(escola.dominio_valor);

        const turno = dominios.find((item) => item.ds_alias === 'TURNOS');
        setTurnos(turno.dominio_valor);

        const serie = dominios.find((item) => item.ds_alias === 'SERIES');
        setSeries(serie.dominio_valor);

        const enc = dominios.find((item) => item.ds_alias === 'PREOCUPACAO');
        setEncaminhamento(enc ? enc.dominio_valor : []);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dominios]);

    const [view, setView] = useState(false);

    useEffect(() => {
        if (state === 'view') {
            setView(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCancel = () => {
        router.push('/core/prontuario');
    };

    //----------------------------------------------------------------\\
    // CASO CAMPO OBRIGATÓRIO NÃO SEJA PREENCHIDO AO SALVAR O SISTEMA \\
    // TE DIRECIONA PARA O CAMPO COM ERRO                             \\
    //----------------------------------------------------------------\\

    // const fieldRefs = {
    //     id_fonoaudiologo: useRef(null),
    //     id_assistente: useRef(null)
    //     // ...adicione outros campos conforme necessário
    // };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            const fieldLabelMap = {
                id_fonoaudiologo: intl.formatMessage({ id: 'prontuario.id_fonoaudiologo' }),
                id_assistente: intl.formatMessage({ id: 'prontuario.id_assistente' })
                // ... outros campos
            };

            const ref = fieldRefs[firstErrorField];
            const nomeCampo = fieldLabelMap[firstErrorField] || firstErrorField;

            // Mostra o snackbar com mensagem personalizada
            dispatch(
                openSnackbar({
                    open: true,
                    message: `O campo "${nomeCampo}" é obrigatório.`,
                    variant: 'alert',
                    alert: { color: 'error' }
                })
            );

            // Aguarda o snackbar ser exibido por 200ms e depois rola até o campo
            setTimeout(() => {
                if (ref && ref.current) {
                    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    ref.current.focus?.();
                }
            }, 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [formik.submitCount]); // 👈 agora depende do submitCount, não só de errors
    }, []);

    const handleRespostaChange = (idProntuarioPergunta, idResposta) => {
        const perguntasAtualizadas = values.prontuario_pergunta.map((item) => {
            if (item.id_prontuario_pergunta === idProntuarioPergunta) {
                return {
                    ...item,
                    id_resposta: idResposta,
                    dominio_valor: item.pergunta.dominio.dominio_valor.find((alt) => alt.id_dominio_valor === idResposta)
                };
            }

            return item;
        });

        setFieldValue('prontuario_pergunta', perguntasAtualizadas);
    };

    console.log('TabProntuarioForm values', values);
    console.log('TabProntuarioForm statusProntuario', statusProntuario);

    return (
        <Page title="Prontuario">
            <Form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MainCard title="Dados Pessoais">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Autocomplete
                                                    id="id_escola"
                                                    fullWidth
                                                    value={escolas.find((item) => item.id_dominio_valor === values.id_escola) || null}
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('id_escola', newValue?.id_dominio_valor ?? null);
                                                    }}
                                                    options={escolas}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.id_dominio_valor === (value?.id_escola ?? null)
                                                    }
                                                    getOptionLabel={(option) => option.ds_dominio_valor}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" {...props}>
                                                            <Typography>{option.ds_dominio_valor}</Typography>
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Escolha uma opção de resposta"
                                                            name="id_escola"
                                                            inputRef={(el) => (fieldRefs.current.id_escola = el)} // Adicione a referência
                                                            label={<FormattedMessage id={'prontuario.id_escola'} />}
                                                            error={Boolean(touched.id_escola && errors.id_escola)}
                                                            helperText={errors.id_escola && touched.id_escola ? errors.id_escola : null}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                readOnly: state === 'view'
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <Stack spacing={1}>
                                                <Autocomplete
                                                    id="cs_serie"
                                                    fullWidth
                                                    value={series.find((item) => item.id_dominio_valor === values.cs_serie) || null}
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('cs_serie', newValue?.id_dominio_valor ?? null);
                                                    }}
                                                    options={series}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.id_dominio_valor === (value?.cs_serie ?? null)
                                                    }
                                                    getOptionLabel={(option) => option.ds_dominio_valor}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" {...props}>
                                                            <Typography>{option.ds_dominio_valor}</Typography>
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Escolha uma opção de resposta"
                                                            name="cs_serie"
                                                            inputRef={(el) => (fieldRefs.current.cs_serie = el)} // Adicione a referência
                                                            label={<FormattedMessage id={'prontuario.cs_serie'} />}
                                                            error={Boolean(touched.cs_serie && errors.cs_serie)}
                                                            helperText={errors.cs_serie && touched.cs_serie ? errors.cs_serie : null}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                readOnly: state === 'view'
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Stack spacing={1}>
                                                <Autocomplete
                                                    id="cs_turno"
                                                    fullWidth
                                                    value={turnos.find((item) => item.id_dominio_valor === values.cs_turno) || null}
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('cs_turno', newValue?.id_dominio_valor ?? null);
                                                    }}
                                                    options={turnos}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.id_dominio_valor === (value?.cs_turno ?? null)
                                                    }
                                                    getOptionLabel={(option) => option.ds_dominio_valor}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" {...props}>
                                                            <Typography>{option.ds_dominio_valor}</Typography>
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Escolha uma opção de resposta"
                                                            name="cs_turno"
                                                            inputRef={(el) => (fieldRefs.current.cs_turno = el)} // Adicione a referência
                                                            label={<FormattedMessage id={'prontuario.cs_turno'} />}
                                                            error={Boolean(touched.cs_turno && errors.cs_turno)}
                                                            helperText={errors.cs_turno && touched.cs_turno ? errors.cs_turno : null}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                readOnly: state === 'view'
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nm_responsavel"
                                                    name="nm_responsavel"
                                                    label={<FormattedMessage id={'prontuario.nm_responsavel'} />}
                                                    value={values.nm_responsavel}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.nm_responsavel && errors.nm_responsavel)}
                                                    helperText={
                                                        errors.nm_responsavel && touched.nm_responsavel ? errors.nm_responsavel : null
                                                    }
                                                    InputProps={{
                                                        readOnly: state === 'view'
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="nr_telefone_responsavel"
                                                    name="nr_telefone_responsavel"
                                                    label={<FormattedMessage id={'prontuario.nr_telefone_responsavel'} />}
                                                    value={values.nr_telefone_responsavel}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={Boolean(touched.nr_telefone_responsavel && errors.nr_telefone_responsavel)}
                                                    helperText={
                                                        errors.nr_telefone_responsavel && touched.nr_telefone_responsavel
                                                            ? errors.nr_telefone_responsavel
                                                            : null
                                                    }
                                                    InputProps={{
                                                        readOnly: state === 'view'
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MainCard title="Qual(is) área(s) gera(m) maior preocupação atualmente ?">
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={12}>
                                                        <Autocomplete
                                                            multiple
                                                            fullWidth
                                                            id="dominio_encaminhamento"
                                                            options={encaminhamento}
                                                            {...getFieldProps('dominio_encaminhamento')}
                                                            getOptionLabel={(label) => label.nm_dominio_valor}
                                                            onChange={(event, newValue) => {
                                                                setFieldValue(
                                                                    'dominio_encaminhamento',
                                                                    newValue ? newValue.id_dominio_valor : ''
                                                                );
                                                                setFieldValue(
                                                                    'ds_declaracao_responsavel',
                                                                    newValue.map((value) => value.ds_dominio_valor).join('\n')
                                                                );
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    name="dominio_encaminhamento"
                                                                    placeholder="Adicionar Declaração"
                                                                />
                                                            )}
                                                            renderTags={(value, getTagProps) =>
                                                                value.map((option, index) => (
                                                                    <Chip
                                                                        {...getTagProps({ index })}
                                                                        variant="combined"
                                                                        key={index}
                                                                        label={option.nm_dominio_valor}
                                                                        deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                                                                        sx={{ color: 'text.primary' }}
                                                                    />
                                                                ))
                                                            }
                                                            noOptionsText="Preocupação"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <TextField
                                                            id="ds_declaracao_responsavel"
                                                            name="ds_declaracao_responsavel"
                                                            fullWidth
                                                            multiline
                                                            minRows={3}
                                                            maxRows={Infinity}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.ds_declaracao_responsavel}
                                                            error={Boolean(
                                                                touched.ds_declaracao_responsavel && errors.ds_declaracao_responsavel
                                                            )}
                                                            helperText={
                                                                errors.ds_declaracao_responsavel && touched.ds_declaracao_responsavel
                                                                    ? errors.ds_declaracao_responsavel
                                                                    : null
                                                            }
                                                            InputProps={{
                                                                readOnly: view
                                                            }}
                                                        ></TextField>
                                                    </Grid>
                                                </Grid>
                                            </MainCard>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            <Grid item xs={12}>
                                <MainCard title="Dados Prontuario">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <TextField
                                                    id="id_fonoaudiologo"
                                                    name="id_fonoaudiologo"
                                                    select
                                                    label={<FormattedMessage id={'prontuario.id_fonoaudiologo'} />}
                                                    error={Boolean(touched.id_fonoaudiologo && errors.id_fonoaudiologo)}
                                                    helperText={
                                                        errors.id_fonoaudiologo && touched.id_fonoaudiologo ? errors.id_fonoaudiologo : null
                                                    }
                                                    value={values.id_fonoaudiologo || ''}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    // disabled={tela === 'atendimento' ? true : view}
                                                    // InputProps={{
                                                    //   readOnly: tela === 'atendimento' ? true : view
                                                    // }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Selecione</em>
                                                    </MenuItem>
                                                    {/* {fonos.map((valor) => (
                                                            <MenuItem key={valor.ID} value={valor.ID}>
                                                                {valor.nm_fonoaudiologo}
                                                            </MenuItem>
                                                        ))} */}
                                                </TextField>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Autocomplete
                                                    id="st_prontuario"
                                                    fullWidth
                                                    value={
                                                        statusProntuario.find((item) => item.id_dominio_valor === values.st_prontuario) ||
                                                        null
                                                    }
                                                    onBlur={handleBlur}
                                                    onChange={(event, newValue) => {
                                                        setFieldValue('st_prontuario', newValue?.id_dominio_valor ?? null);
                                                    }}
                                                    options={statusProntuario}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.id_dominio_valor === (value?.st_prontuario ?? null)
                                                    }
                                                    getOptionLabel={(option) => option.ds_dominio_valor}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" {...props}>
                                                            <Typography>{option.ds_dominio_valor}</Typography>
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Escolha um status"
                                                            name="st_prontuario"
                                                            inputRef={(el) => (fieldRefs.current.st_prontuario = el)} // Adicione a referência
                                                            label={<FormattedMessage id={'prontuario.st_prontuario'} />}
                                                            error={Boolean(touched.st_prontuario && errors.st_prontuario)}
                                                            helperText={
                                                                errors.st_prontuario && touched.st_prontuario ? errors.st_prontuario : null
                                                            }
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                readOnly: state === 'view'
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MainCard title="Questionário">
                                    <Stack spacing={2.5}>
                                        <List sx={{ p: 0 }}>
                                            {values.prontuario_pergunta?.map((item) => {
                                                const alternativas = item?.pergunta?.dominio?.dominio_valor || [];

                                                return (
                                                    <ListItem
                                                        key={item.id_prontuario_pergunta}
                                                        sx={{
                                                            display: 'block',
                                                            borderBottom: '1px solid #e0e0e0',
                                                            py: 2
                                                        }}
                                                    >
                                                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                                            {item.pergunta?.ds_pergunta}
                                                        </Typography>

                                                        <RadioGroup
                                                            row
                                                            value={item.id_resposta}
                                                            onChange={(e) =>
                                                                handleRespostaChange(item.id_prontuario_pergunta, Number(e.target.value))
                                                            }
                                                        >
                                                            {alternativas.map((alternativa) => (
                                                                <FormControlLabel
                                                                    key={alternativa.id_dominio_valor}
                                                                    value={alternativa.id_dominio_valor}
                                                                    control={<Radio />}
                                                                    label={alternativa.ds_dominio_valor}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Stack>
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        </Page>
    );
};

TabProntuarioForm.propTypes = {
    initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string,
    tela: PropTypes.string
};

TabProntuarioForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabProntuarioForm;

import { CameraOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Avatar from 'components/@extended/Avatar';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import { ThemeMode } from 'config';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'store';
import { getAll as getAssistentes } from 'store/reducers/assistente';
import { getAll as getDominio } from 'store/reducers/dominio';
import { getAll as getFonos } from 'store/reducers/fonoaudiologo';
import { editar, getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
// ==============================|| TabDadosPacienteForm ||============================== //

dayjs.extend(duration);

const TabDadosPacienteForm = (props) => {
  const { initialValues, state, tela } = props;

  const intl = useIntl();
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { id } = router.query;

  const [dados, setDados] = useState(initialValues);
  const [observacaoProntuario, setObservacaoProntuario] = useState(true);
  const [comportamentoAuditivo, setComportamentoAuditivo] = useState(true);
  const [conclusao, setConclusao] = useState(true);
  const [fonologia, setFonologia] = useState(true);
  const [rastreioPac, setRastreioPac] = useState(true);
  const [encaminhamento, setEncaminhamento] = useState(true);

  const { data: prontuario } = useSelector((state) => state.prontuario);
  const { data: fonos } = useSelector((state) => state.fono);
  const { data: assistentes } = useSelector((state) => state.assistente);

  useEffect(() => {
    dispatch(getFonos());
    dispatch(getAssistentes());
    dispatch(getDominio()).then((resp) => {
      const comp = resp.data.find((item) => item.ds_alias === 'COMPORTAMENTO_AUDITIVO');
      const obs = resp.data.find((item) => item.ds_alias === 'OBSERVACAO_PRONTUARIO');
      const conc = resp.data.find((item) => item.ds_alias === 'CONCLUSAO');
      const fono = resp.data.find((item) => item.ds_alias === 'FONOLOGIA');
      const pac = resp.data.find((item) => item.ds_alias === 'RASTREIO_PAC');
      const enc = resp.data.find((item) => item.ds_alias === 'ENCAMINHAMENTO');

      setComportamentoAuditivo(comp ? comp.dominio_valor : []);
      setObservacaoProntuario(obs ? obs.dominio_valor : []);
      setConclusao(conc ? conc.dominio_valor : []);
      setFonologia(fono ? fono.dominio_valor : []);
      setRastreioPac(pac ? pac.dominio_valor : []);
      setEncaminhamento(enc ? enc.dominio_valor : []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // imagem
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState('/assets/images/users/default.png');
  const [view, setView] = useState(false);
  //   const [options, setOptions] = useState([]);

  // (('A', 'E', 'C')); -- VALORES [ A - Aguardando Atendimento, E - Em Atendimento, C - Atendimento Concluído ]
  //   const statusAtendimento = [
  //     { ID: 'A', NOME: 'Aguardando Atendimento' },
  //     { ID: 'E', NOME: 'Em Atendimento' },
  //     { ID: 'C', NOME: 'Atendimento Concluído' }
  //   ];

  const statusProntuario = [
    { ID: 'P', NOME: 'Pendente' },
    { ID: 'R', NOME: 'Revisão' },
    { ID: 'F', NOME: 'Aguardando Faturamento' },
    { ID: 'C', NOME: 'Concluído' }
  ];

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    setDados(prontuario);
  }, [prontuario, fonos]);

  useEffect(() => {
    if (state === 'view') {
      setView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onCancel = () => {
    tela === 'atendimento' ? router.push('/core/atendimento') : router.push('/core/prontuario');
  };

  const formik = useFormik({
    initialValues: dados,
    validationSchema: Yup.object().shape({
      id_fonoaudiologo: Yup.number()
        .max(255)
        .required(intl.formatMessage({ id: 'prontuario.id_fonoaudiologo' }) + intl.formatMessage({ id: 'isRequired' })),
      id_assistente: Yup.number()
        .max(255)
        .required(intl.formatMessage({ id: 'prontuario.id_assistente' }) + intl.formatMessage({ id: 'isRequired' }))
    }),
    onSubmit: (values) => {
      try {
        if (state === 'edit') {
          const edit = {
            id_prontuario: values.id_prontuario,
            ds_prontuario: values.ds_prontuario,
            dh_inicio_atendimento: values.dh_inicio_atendimento,
            dh_termino_atendimento: values.dh_termino_atendimento,
            ds_resultado: values.ds_resultado,
            id_fonoaudiologo: values.id_fonoaudiologo,
            id_assistente: values.id_assistente,
            st_ativo: values.st_ativo,
            st_prontuario: values.st_prontuario,
            ds_observacao: values.ds_observacao,
            ds_conclusao: values.ds_conclusao,
            ds_comportamento_auditivo: values.ds_comportamento_auditivo,
            ds_fonologia: values.ds_fonologia,
            ds_rastreio_pac: values.ds_rastreio_pac,
            ds_encaminhamento: values.ds_encaminhamento
          };
          // Se estiver no modo de edição, atualize o item
          dispatch(editar(edit.id_prontuario, edit))
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
            .finally(() => {
              setSubmitting(false);
              dispatch(getId(id));
            });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue, getFieldProps } =
    formik;

  //----------------------------------------------------------------\\
  // CASO CAMPO OBRIGATÓRIO NÃO SEJA PREENCHIDO AO SALVAR O SISTEMA \\
  // TE DIRECIONA PARA O CAMPO COM ERRO                             \\
  //----------------------------------------------------------------\\

  const fieldRefs = {
    id_fonoaudiologo: useRef(null),
    id_assistente: useRef(null)
    // ...adicione outros campos conforme necessário
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [formik.submitCount]); // 👈 agora depende do submitCount, não só de errors

  //===================== data =================\\

  // Dentro do componente, onde você está exibindo a diferença entre datas
  const dataAtual = dayjs();
  const dataNascimento = dayjs(values?.auto_declaracao?.paciente?.dt_nascimento);

  // Calcule a diferença entre as datas
  const diff = dayjs.duration(dataAtual.diff(dataNascimento));

  // Exiba a diferença em anos, meses e dias
  const anos = diff.years();
  const meses = diff.months();
  const dias = diff.days();

  if (observacaoProntuario === true || comportamentoAuditivo === true) return <Loader />;

  //   const fieldObservacao = (newValue) => {
  //     setFieldValue('ds_observacao', newValue.map((value) => value.ds_dominio_valor).join('\n'));
  //   };

  return (
    <Page title="Prontuario">
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="Dados Pessoais">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                          <FormLabel
                            htmlFor="change-avtar"
                            sx={{
                              position: 'relative',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              '&:hover .MuiBox-root': { opacity: 1 },
                              cursor: 'pointer'
                            }}
                          >
                            <Avatar alt="Avatar 1" src={avatar} sx={{ width: 76, height: 76 }} />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Stack spacing={0.5} alignItems="center">
                                <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }} />
                                <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                                  Upload
                                </Typography>
                              </Stack>
                            </Box>
                          </FormLabel>
                          <Typography sx={{ color: 'secondary.darker' }} variant="subtitle">
                            {`${anos} anos ${meses} meses ${dias} dias`}
                          </Typography>
                          <TextField
                            type="file"
                            id="change-avtar"
                            placeholder="Outlined"
                            variant="outlined"
                            sx={{ display: 'none' }}
                            onChange={(e) => setSelectedImage(e.target.files?.[0])}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                          <TextField
                            id="nm_paciente"
                            name="nm_paciente"
                            label={<FormattedMessage id={'prontuario.nm_paciente'} />}
                            value={values?.auto_declaracao?.paciente?.nm_paciente}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <TextField
                            id="nm_escola"
                            name="nm_escola"
                            label={<FormattedMessage id={'prontuario.nm_escola'} />}
                            value={values?.auto_declaracao?.escola?.nm_escola}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <TextField
                            id="dt_auto_declaracao"
                            name="dt_auto_declaracao"
                            label={<FormattedMessage id={'autoDeclaracao.dt_auto_declaracao'} />}
                            // value={values.auto_declaracao?.dt_auto_declaracao}
                            value={dayjs(values?.auto_declaracao?.dt_auto_declaracao).format('DD/MM/YYYY')}
                            InputProps={{
                              readOnly: true
                            }}
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Stack spacing={1}>
                          <TextField
                            id="cs_serie"
                            name="cs_serie"
                            label={<FormattedMessage id={'autoDeclaracao.cs_serie'} />}
                            value={values?.auto_declaracao?.cs_serie}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <Stack spacing={1}>
                          <TextField
                            id="cs_turma"
                            name="cs_turma"
                            label={<FormattedMessage id={'autoDeclaracao.cs_turma'} />}
                            value={values?.auto_declaracao?.cs_turma}
                            InputProps={{
                              readOnly: true
                            }}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <Stack spacing={1}>
                          <TextField
                            id="cs_turno"
                            name="cs_turno"
                            label={<FormattedMessage id={'autoDeclaracao.cs_turno'} />}
                            value={values?.auto_declaracao?.cs_turno}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <TextField
                            id="nm_plano_saude"
                            name="nm_plano_saude"
                            label={<FormattedMessage id={'autoDeclaracao.id_plano_saude'} />}
                            value={values?.auto_declaracao?.plano_saude?.nm_plano_saude}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <TextField
                            id="nm_responsavel"
                            name="nm_responsavel"
                            label={<FormattedMessage id={'autoDeclaracao.nm_responsavel'} />}
                            value={values?.auto_declaracao?.paciente?.nm_responsavel}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <TextField
                            id="nr_telefone"
                            name="nr_telefone"
                            label={<FormattedMessage id={'autoDeclaracao.nr_telefone'} />}
                            value={values?.auto_declaracao?.paciente?.nr_telefone}
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                          <TextField
                            id="ds_auto_declaracao"
                            name="ds_auto_declaracao"
                            fullWidth
                            multiline
                            rows={8}
                            label={<FormattedMessage id={'autoDeclaracao.ds_auto_declaracao'} />}
                            value={values?.auto_declaracao?.ds_auto_declaracao}
                            InputProps={{
                              readOnly: true
                            }}
                          ></TextField>
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
                      <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                        <ListItem>
                          <ListItemText
                            id="switch-list-label-dor-ouvido"
                            primary={
                              <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_dor_ouvido'} />}</Typography>
                            }
                          />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_dor_ouvido"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_dor_ouvido)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                      </List>
                      <Divider />
                      <Typography variant="subtitle1">{'Fala:'}</Typography>
                      <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                        <ListItem>
                          <ListItemText
                            id="switch-list-label-dificuldade"
                            primary={
                              <Typography color="secondary">
                                <FormattedMessage id={'autoDeclaracao.cs_dif_fala'} />
                              </Typography>
                            }
                          />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_dif_fala"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_dif_fala)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            id="switch-list-label-dificuldade-fala"
                            primary={
                              <Typography color="secondary">
                                <FormattedMessage id={'autoDeclaracao.cs_dif_fala_em_terapia'} />
                              </Typography>
                            }
                          />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_dif_fala_em_terapia"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_dif_fala_em_terapia)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            id="switch-list-label-order-2"
                            primary={
                              <Typography color="secondary">
                                <FormattedMessage id={'autoDeclaracao.cs_dif_fala_ja_fez_terapia'} />
                              </Typography>
                            }
                          />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_dif_fala_ja_fez_terapia"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_dif_fala_ja_fez_terapia)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                      </List>
                      <Divider />
                      <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_aprendizagem'} />}</Typography>
                      <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                        <ListItem>
                          <ListItemText
                            id="switch-list-label-order-1"
                            primary={<Typography color="secondary">Baixo rendimento escolar</Typography>}
                          />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_aprendizagem_baixo_rend"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_aprendizagem_baixo_rend)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                        <ListItem>
                          <ListItemText id="switch-list-label-order-2" primary={<Typography color="secondary">Desatento</Typography>} />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_aprendizagem_desatento"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_aprendizagem_desatento)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                        <ListItem>
                          <ListItemText id="switch-list-label-order-3" primary={<Typography color="secondary">Agitado</Typography>} />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_aprendizagem_agitado"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_aprendizagem_agitado)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                      </List>
                      <Divider />
                      <Typography variant="subtitle1">{<FormattedMessage id={'autoDeclaracao.cs_usa'} />}</Typography>
                      <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                        <ListItem>
                          <ListItemText id="switch-list-label-order-1" primary={<Typography color="secondary">Chupeta</Typography>} />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_usa_chupeta"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_usa_chupeta)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                        <ListItem>
                          <ListItemText id="switch-list-label-order-2" primary={<Typography color="secondary">Dedo</Typography>} />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_usa_dedo"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_usa_dedo)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                        <ListItem>
                          <ListItemText id="switch-list-label-order-3" primary={<Typography color="secondary">Mamadeira</Typography>} />
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Não</Typography>
                            <FormControlLabel
                              name="cs_usa_mamadeira"
                              control={<Switch color="primary" />}
                              checked={Boolean(values?.auto_declaracao?.cs_usa_mamadeira)}
                            />
                            <Typography>Sim</Typography>
                          </Stack>
                        </ListItem>
                      </List>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard title="Dados Prontuario">
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <TextField
                            id="dh_inicio_atendimento"
                            name="dh_inicio_atendimento"
                            label={<FormattedMessage id={'prontuario.dh_inicio_atendimento'} />}
                            value={values.dh_inicio_atendimento ? dayjs(values.dh_inicio_atendimento).format('DD/MM/YYYY') : ''}
                            InputProps={{
                              readOnly: true
                            }}
                          ></TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <TextField
                            id="id_fonoaudiologo"
                            name="id_fonoaudiologo"
                            select
                            label={<FormattedMessage id={'prontuario.id_fonoaudiologo'} />}
                            error={Boolean(touched.id_fonoaudiologo && errors.id_fonoaudiologo)}
                            helperText={errors.id_fonoaudiologo && touched.id_fonoaudiologo ? errors.id_fonoaudiologo : null}
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
                            {fonos.map((valor) => (
                              <MenuItem key={valor.ID} value={valor.ID}>
                                {valor.nm_fonoaudiologo}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <Autocomplete
                            id="id_assistente"
                            fullWidth
                            value={assistentes.find((assistente) => assistente.ID === values?.id_assistente) || null}
                            onBlur={handleBlur}
                            onChange={(event, newValue) => {
                              setFieldValue('id_assistente', newValue ? newValue.ID : '');
                            }}
                            options={assistentes}
                            autoHighlight
                            isOptionEqualToValue={(option, value) => option.ID === (value ? value.ID : null)}
                            getOptionLabel={(option) => option.nm_assistente}
                            renderOption={(props, option) => (
                              <Box component="li" {...props}>
                                <Typography>{option.nm_assistente}</Typography>
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputRef={fieldRefs.id_assistente}
                                placeholder="Escolha um assistente"
                                name="id_assistente"
                                label={<FormattedMessage id={'prontuario.id_assistente'} />}
                                error={Boolean(touched.id_assistente && errors.id_assistente)}
                                helperText={errors.id_assistente && touched.id_assistente ? errors.id_assistente : null}
                                inputProps={{
                                  ...params.inputProps
                                }}
                              />
                            )}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <TextField
                            id="st_prontuario"
                            name="st_prontuario"
                            select
                            label={<FormattedMessage id={'prontuario.st_prontuario'} />}
                            error={Boolean(touched.st_prontuario && errors.st_prontuario)}
                            helperText={errors.st_prontuario && touched.st_prontuario ? errors.st_prontuario : null}
                            value={values.st_prontuario || ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={tela === 'atendimento' ? true : view}
                            // InputProps={{
                            //   readOnly: tela === 'atendimento' ? true : view
                            // }}
                          >
                            <MenuItem value="">
                              <em>Selecione</em>
                            </MenuItem>
                            {statusProntuario.map((valor) => (
                              <MenuItem key={valor.ID} value={valor.ID}>
                                {valor.NOME}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                      </Grid>
                      {tela === 'atendimento' ? null : (
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="ds_prontuario"
                            name="ds_prontuario"
                            label={<FormattedMessage id={'prontuario.ds_prontuario'} />}
                            fullWidth
                            multiline
                            minRows={3}
                            maxRows={Infinity}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ds_prontuario}
                            InputProps={{
                              readOnly: view
                            }}
                          ></TextField>
                        </Grid>
                      )}
                      <Grid item xs={12} md={12}>
                        <MainCard title="Conclusão">
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Autocomplete
                                multiple
                                fullWidth
                                id="dominio_conclusao"
                                options={conclusao}
                                {...getFieldProps('dominio_conclusao')}
                                getOptionLabel={(label) => label.nm_dominio_valor}
                                onChange={(event, newValue) => {
                                  setFieldValue('dominio_conclusao', newValue ? newValue.id_dominio_valor : '');
                                  setFieldValue('ds_conclusao', newValue.map((value) => value.ds_dominio_valor).join('\n'));
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} name="dominio_conclusao" placeholder="Adicionar Conclusão" />
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
                                noOptionsText="CONCLUSAO"
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                id="ds_conclusao"
                                name="ds_conclusao"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ds_conclusao}
                                InputProps={{
                                  readOnly: view
                                }}
                              ></TextField>
                            </Grid>
                          </Grid>
                        </MainCard>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <MainCard title="Comportamento Auditivo">
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Autocomplete
                                multiple
                                fullWidth
                                id="dominio_comportamento"
                                options={comportamentoAuditivo}
                                {...getFieldProps('dominio_comportamento')}
                                getOptionLabel={(label) => label.nm_dominio_valor}
                                onChange={(event, newValue) => {
                                  setFieldValue('dominio_comportamento', newValue ? newValue.id_dominio_valor : '');
                                  setFieldValue('ds_comportamento_auditivo', newValue.map((value) => value.ds_dominio_valor).join('\n'));
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} name="dominio_comportamento" placeholder="Adicionar Comportamento Auditivo" />
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
                                noOptionsText="COMPORTAMENTO_AUDITIVO"
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                id="ds_comportamento_auditivo"
                                name="ds_comportamento_auditivo"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ds_comportamento_auditivo}
                                InputProps={{
                                  readOnly: view
                                }}
                              ></TextField>
                            </Grid>
                          </Grid>
                        </MainCard>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <MainCard title="Observação">
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Autocomplete
                                multiple
                                fullWidth
                                id="dominio_observacao"
                                options={observacaoProntuario}
                                {...getFieldProps('dominio_observacao')}
                                getOptionLabel={(label) => label.nm_dominio_valor}
                                onChange={(event, newValue) => {
                                  setFieldValue('dominio_observacao', newValue ? newValue.id_dominio_valor : '');
                                  setFieldValue('ds_observacao', newValue.map((value) => value.ds_dominio_valor).join('\n'));
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} name="dominio_observacao" placeholder="Adicionar Observação" />
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
                                noOptionsText="OBSERVACAO_PRONTUARIO"
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                id="ds_observacao"
                                name="ds_observacao"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ds_observacao}
                                InputProps={{
                                  readOnly: view
                                }}
                              ></TextField>
                            </Grid>
                          </Grid>
                        </MainCard>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <MainCard title="Fonologia">
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Autocomplete
                                multiple
                                fullWidth
                                id="dominio_fonologia"
                                options={fonologia}
                                {...getFieldProps('dominio_fonologia')}
                                getOptionLabel={(label) => label.nm_dominio_valor}
                                onChange={(event, newValue) => {
                                  setFieldValue('dominio_fonologia', newValue ? newValue.id_dominio_valor : '');
                                  setFieldValue('ds_fonologia', newValue.map((value) => value.ds_dominio_valor).join('\n'));
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} name="dominio_fonologia" placeholder="Adicionar Fonologia" />
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
                                noOptionsText="FONOLOGIA"
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                id="ds_fonologia"
                                name="ds_fonologia"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ds_fonologia}
                                InputProps={{
                                  readOnly: view
                                }}
                              ></TextField>
                            </Grid>
                          </Grid>
                        </MainCard>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <MainCard title="Rastreio PAC">
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Autocomplete
                                multiple
                                fullWidth
                                id="dominio_pac"
                                options={rastreioPac}
                                {...getFieldProps('dominio_pac')}
                                getOptionLabel={(label) => label.nm_dominio_valor}
                                onChange={(event, newValue) => {
                                  setFieldValue('dominio_pac', newValue ? newValue.id_dominio_valor : '');
                                  setFieldValue('ds_rastreio_pac', newValue.map((value) => value.ds_dominio_valor).join('\n'));
                                }}
                                renderInput={(params) => <TextField {...params} name="dominio_pac" placeholder="Adicionar Rastreio PAC" />}
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
                                noOptionsText="RASTREIO_PAC"
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                id="ds_rastreio_pac"
                                name="ds_rastreio_pac"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ds_rastreio_pac}
                                InputProps={{
                                  readOnly: view
                                }}
                              ></TextField>
                            </Grid>
                          </Grid>
                        </MainCard>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <MainCard title="Encaminhamento">
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
                                  setFieldValue('dominio_encaminhamento', newValue ? newValue.id_dominio_valor : '');
                                  setFieldValue('ds_encaminhamento', newValue.map((value) => value.ds_dominio_valor).join('\n'));
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} name="dominio_encaminhamento" placeholder="Adicionar Rastreio PAC" />
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
                                noOptionsText="ENCAMINHAMENTO"
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                id="ds_encaminhamento"
                                name="ds_encaminhamento"
                                fullWidth
                                multiline
                                minRows={3}
                                maxRows={Infinity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ds_encaminhamento}
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
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                  variant="contained"
                  color="primary"
                >
                  Salvar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Page>
  );
};

TabDadosPacienteForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  state: PropTypes.string,
  tela: PropTypes.string
};

TabDadosPacienteForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabDadosPacienteForm;

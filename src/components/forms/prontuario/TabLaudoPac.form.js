import { EditOutlined, PrinterFilled, ShareAltOutlined } from '@ant-design/icons';
import { Box, Button, CardContent, Grid, IconButton, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Layout from 'layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ReactToPrint from 'react-to-print';
import { useDispatch, useSelector } from 'store';
import { getAll as getFonos } from 'store/reducers/fonoaudiologo';
import { getId } from 'store/reducers/prontuario';
import LaudoDicoticoDigitosForm from '../pac/dicotico-digitos/laudo-dicotico-digitos.forms';
import LaudoDicoticoSequencialForm from '../pac/dicotico-sequencial/laudo-dicotico-sequencial.form';
import LaudoLocalizacaoSonoraForm from '../pac/localizacao-sonora/laudo-localizacao-sonora.form';
import LaudoOrdenacaoTemporalForm from '../pac/ordenacao-temporal/laudo-ordenacao-temporal.form';
import LaudoResolucaoTemporalForm from '../pac/resolucao-temporal/laudo-resolucao-temporal-form';
// ==============================|| MEATOSCOPIA ||============================== //
dayjs.extend(duration);

const TabLaudoPacForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const [dados, setDados] = useState(true);

  const { data } = useSelector((state) => state.prontuario);
  const { data: fonos } = useSelector((state) => state.fono);

  useEffect(() => {
    dispatch(getId(id));
    dispatch(getFonos());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDados(data);
    // eslint-disable-next-line
  }, [data]);

  const onCancel = () => {
    router.push('/core/prontuario');
  };

  if (dados === true) return <Loader />;

  //================ DATA DE NASCIMENTO ================\\
  // Dentro do componente, onde você está exibindo a diferença entre datas
  const dataAtual = dayjs();
  const dataNascimento = dayjs(dados?.agendamento?.auto_declaracao?.paciente?.dt_nascimento);

  // Calcule a diferença entre as datas
  const diff = dayjs.duration(dataAtual.diff(dataNascimento));

  // Exiba a diferença em anos, meses e dias
  const anos = diff.years();
  const meses = diff.months();
  const dias = diff.days();

  const fonoaudiologia = fonos.find((fono) => fono.ID === dados?.id_fonoaudiologo);

  return (
    <MainCard title="Triagem Auditiva Escolar" content={false}>
      <Stack spacing={2.5}>
        <Box sx={{ p: 2.5, pb: 0 }}>
          <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <IconButton onClick={() => router.push(`/apps/invoice/edit/${id}`)}>
                <EditOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton>
              <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              />
              <IconButton>
                <ShareAltOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton>
            </Stack>
          </MainCard>
        </Box>
      </Stack>
      <CardContent id="print" ref={componentRef}>
        <Stack spacing={2.5} direction="row" justifyContent="center" alignItems="center"></Stack>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false} sx={{ p: 3, border: 1, borderColor: theme.palette.grey[900] }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="nm_paciente"
                    name="nm_paciente"
                    fullWidth
                    label={<FormattedMessage id={'Nome'} />}
                    value={dados?.agendamento?.auto_declaracao?.paciente?.nm_paciente}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="dt_nascimento"
                    name="dt_nascimento"
                    fullWidth
                    label={<FormattedMessage id={'Data de Nascimento'} />}
                    value={dayjs(dados?.agendamento?.auto_declaracao?.paciente?.dt_nascimento).format('DD/MM/YYYY')}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="idade"
                    name="idade"
                    fullWidth
                    label={<FormattedMessage id={'Idade'} />}
                    value={`${anos} anos ${meses} meses ${dias} dias`}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="dt_exame"
                    name="dt_exame"
                    fullWidth
                    label={<FormattedMessage id={'Data do Exame'} />}
                    value={dados?.dh_inicio_atendimento === null ? '' : dayjs(dados?.dh_inicio_atendimento).format('DD/MM/YYYY')}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="nm_escola"
                    name="nm_escola"
                    fullWidth
                    label={<FormattedMessage id={'Escola'} />}
                    value={dados?.agendamento?.auto_declaracao?.escola?.nm_escola}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="nm_fonoaudiologo"
                    fullWidth
                    name="nm_fonoaudiologo"
                    label={<FormattedMessage id={'Examinador Responsável'} />}
                    value={fonoaudiologia?.nm_fonoaudiologo}
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MainCard title="Resultado" content={false}>
              <List sx={{ p: 0 }}>
                <ListItem divider>
                  <ListItemText
                    id="resultado"
                    primary="Local"
                    secondary="Utiliza-se de cabine acusticamente tratada adaptada em veículo para atendimento móvel, ideal para o processo de avaliação auditiva simples e rápida, garantindo atenuação de ruídos externos. Aferi-se o nível de ruído com o medidor do nível de pressão sonora modelo DEC-460, ao qual deve encontrar-se inferior a 60dBNA. Os equipamentos utilizados: Audiômetro Interacoustic MA 42, Impedanciômetro Iteracoustic AT 235, Otoemissão Ero-Scan, cabine acústica LPW. Todos devidamente calibrados em 09 de maio de 2023 com validade de 1 ano. Conforme a Resolução N° 274, de 20 de Abril, 2001."
                  />
                </ListItem>
              </List>
            </MainCard>
          </Grid>

          <Grid item xs={12} sm={12}>
            <LaudoLocalizacaoSonoraForm initialValues={dados.pac?.localizacao_sonora} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LaudoDicoticoDigitosForm initialValues={dados.pac?.dicotico_digitos} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LaudoOrdenacaoTemporalForm initialValues={dados.pac?.ordenacao_temporal} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LaudoDicoticoSequencialForm initialValues={dados.pac?.dicotico_sequencial} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LaudoResolucaoTemporalForm initialValues={dados.pac?.resolucao_temporal} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Voltar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

TabLaudoPacForm.propTypes = {
  dados: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

TabLaudoPacForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabLaudoPacForm;

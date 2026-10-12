import { PrinterFilled } from '@ant-design/icons';
import { Box, Button, CardMedia, Grid, IconButton, Stack, Typography } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Layout from 'layout/index';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { useDispatch, useSelector } from 'store';
import { getAll as getFonos } from 'store/reducers/fonoaudiologo';
import { getId } from 'store/reducers/prontuario';

const paleta = createTheme({
  palette: {
    auditive: '#0e558c'
  }
});

// ==============================|| MEATOSCOPIA ||============================== //
dayjs.extend(duration);

const TabLaudoForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const componentRef = useRef(null);
  const [dados, setDados] = useState(true);

  const router = useRouter();
  const { id } = router.query;

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
  const logoOrelha = '/assets/images/logo/orelha/Orelha-Azul.png';
  const rodape = '/assets/images/logo/nome/LOGO-NORMAL-AZUL.png';
  const assinatura = '/assets/images/assinatura.jpeg';

  const fonoaudiologia = fonos.find((fono) => fono.ID === dados?.id_fonoaudiologo);

  return (
    <Page title="Laudo">
      <MainCard content={false}>
        <Stack spacing={2.5}>
          <Box sx={{ p: 2.5, pb: 2.5 }}>
            <MainCard
              content={false}
              sx={{
                p: 1.25,
                bgcolor: 'primary.lighter',
                borderColor: theme.palette.primary[100]
              }}
            >
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <ReactToPrint
                  trigger={() => (
                    <IconButton>
                      <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                    </IconButton>
                  )}
                  content={() => componentRef.current}
                  pageStyle={`
                    @page {
                      size: A4;
                      margin: 10mm;
                    }
                  
                    .header {
                      position: sticky;
                      top: 0;
                      width: 100%;
                      height: 120px;
                      z-index: 1000;
                    }
                  
                    .body {                      
                      margin-top: 320px;
                      margin-bottom: 150px;
                      width: 100%;                                  
                    }
                
                    .footer {
                      position: sticky;
                      bottom: 0;
                      width: 100%;                      
                      height: 120px;
                      z-index: 1000;
                    }
                
                    .no-print {
                      display: none;
                    }
                  
                    .no-break {
                      page-break-inside: avoid;
                      height: auto !important                      
                    }

                    .no-rolagem {
                      height: auto !important                      
                    }
                   
                  `}
                />
              </Stack>
            </MainCard>
          </Box>
        </Stack>

        <Grid container spacing={3} id="print" ref={componentRef}>
          <Grid item xs={12}>
            <Box sx={{ p: 0 }} className="header">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MainCard content={false} sx={{ p: 1, width: '100%', border: 1, borderColor: theme.palette.grey[900] }}>
                    {/* <MainCard content={false} sx={{ p: 0, borderColor: paleta.palette.auditive, bgcolor: '#0e558c' }}> */}
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                          <Grid item xs={2}>
                            <Stack justifyContent="center" alignItems="center">
                              <CardMedia component="img" src={logoOrelha} alt="Logo" sx={{ width: 70, height: 100 }} />
                            </Stack>
                          </Grid>
                          <Grid item xs={10}>
                            <Stack direction="row" justifyContent="flex-start" alignItems="center">
                              <Grid item xs={6}>
                                <Typography variant="h5">Nome:</Typography>
                                <Typography variant="h6" gutterBottom>
                                  {dados?.auto_declaracao?.paciente?.nm_paciente}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h5">Data do Exame:</Typography>
                                <Typography variant="h6" gutterBottom>
                                  {dados?.dh_inicio_atendimento
                                    ? dayjs(new Date(dados?.dh_inicio_atendimento).toISOString().split('T')[0]).format('DD/MM/YYYY')
                                    : ''}
                                </Typography>
                              </Grid>
                            </Stack>

                            <Stack direction="row" justifyContent="flex-start" alignItems="center">
                              <Grid item xs={6}>
                                <Typography variant="h5">Data de Nascimento:</Typography>
                                <Typography variant="h6">
                                  {dados?.auto_declaracao?.paciente?.dt_nascimento
                                    ? dayjs(new Date(dados?.auto_declaracao?.paciente?.dt_nascimento).toISOString().split('T')[0]).format(
                                        'DD/MM/YYYY'
                                      )
                                    : ''}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h5">Examinador:</Typography>
                                <Typography variant="h6"> {fonoaudiologia?.nm_fonoaudiologo}</Typography>
                              </Grid>
                            </Stack>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ p: 0, pb: 0 }}>
                    <MainCard content={false} sx={{ p: 0, borderColor: paleta.palette.auditive, bgcolor: '#0e558c' }}>
                      <Stack direction="row" justifyContent="center">
                        <Typography variant="h4" color="secondary.A100">
                          Resultado de Triagem Auditiva Escolar
                        </Typography>
                      </Stack>
                    </MainCard>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MainCard sx={{ p: 3, pb: 3, height: '100%', width: '100%' }} className="no-break" content={false}>
                    <Typography variant="h5">Local</Typography>
                    <Typography variant="body1" align="justify">
                      Utiliza-se de cabine acusticamente tratada adaptada em veículo para atendimento móvel, ideal para o processo de
                      avaliação auditiva simples e rápida, garantindo atenuação de ruídos externos. Aferi-se o nível de ruído com o medidor
                      do nível de pressão sonora modelo DEC-460, ao qual deve encontrar-se inferior a 60dBNA. Os equipamentos utilizados:
                      Audiômetro Interacoustic MA 42, Impedanciômetro Iteracoustic AT 235, Otoemissão Ero-Scan, cabine acústica LPW. Todos
                      devidamente calibrados em 09 de maio de 2023 com validade de 1 ano. Conforme a Resolução N° 274, de 20 de Abril, 2001.
                    </Typography>
                  </MainCard>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="body">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="h5">Meatoscopia</Typography>
                        <Typography variant="body1" align="justify">
                          Critério de normalidade: “PASSA” dentro dos parâmetros para triagem auditiva: Ausência de obstrução e ou qualquer
                          alteração no aspecto do meato acústico externo.
                        </Typography>
                      </>
                    }
                    sx={{ height: '100%', width: '100%' }}
                    className="no-break"
                  >
                    <Grid container spacing={2.5}>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1">Orelha Esquerda</Typography>
                          {dados?.meatoscopia?.cs_recusa === true ? (
                            <Typography variant="body1" align="justify">
                              Não permitiu a inspeção.
                            </Typography>
                          ) : dados?.meatoscopia?.oe_cera === true ? (
                            <Typography variant="body1" align="justify">
                              Falha na visualização do canal auditivo. Não foi possível visualizar o canal auditivo devido à obstrução
                              presente no conduto auditivo externo.
                            </Typography>
                          ) : dados?.meatoscopia?.oe_inflamado === true ? (
                            <Typography variant="body1" align="justify">
                              Falha, na inspeção do meato acústico externo, notou-se alteração na aparência do canal auditivo e ou tímpano
                            </Typography>
                          ) : dados?.meatoscopia?.oe_corpo_estranho === true ? (
                            <Typography variant="body1" align="justify">
                              {' '}
                              Notou-se presença de corpo estranho no conduto auditivo externo.
                            </Typography>
                          ) : dados?.meatoscopia?.oe_normal === true ? (
                            <Typography variant="body1" align="justify">
                              O conduto auditivo está livre de obstruções e não há alterações na membrana timpânica.
                            </Typography>
                          ) : (
                            <Typography></Typography>
                          )}
                        </MainCard>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1">Orelha Direita</Typography>
                          {dados?.meatoscopia?.cs_recusa === true ? (
                            <Typography variant="body1" align="justify">
                              Não permitiu a inspeção.
                            </Typography>
                          ) : dados?.meatoscopia?.od_cera === true ? (
                            <Typography variant="body1" align="justify">
                              Falha na visualização do canal auditivo. Não foi possível visualizar o canal auditivo devido à obstrução
                              presente no conduto auditivo externo.
                            </Typography>
                          ) : dados?.meatoscopia?.od_inflamado === true ? (
                            <Typography variant="body1" align="justify">
                              Falha, na inspeção do meato acústico externo, notou-se alteração na aparência do canal auditivo e ou tímpano
                            </Typography>
                          ) : dados?.meatoscopia?.od_corpo_estranho === true ? (
                            <Typography variant="body1" align="justify">
                              {' '}
                              Notou-se presença de corpo estranho no conduto auditivo externo.
                            </Typography>
                          ) : dados?.meatoscopia?.od_normal === true ? (
                            <Typography variant="body1" align="justify">
                              O conduto auditivo está livre de obstruções e não há alterações na membrana timpânica.
                            </Typography>
                          ) : (
                            <Typography></Typography>
                          )}
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="h5">Impedanciomentria</Typography>
                        <Typography variant="body1" align="justify">
                          Critério de normalidade: Curvas timpanométricas do tipo: “A” com presença de reflexos ipsilateral em 1KHZ à 4KHZ a
                          estímulos aplicados a 100dBNA.
                        </Typography>
                      </>
                    }
                    sx={{ height: '100%' }}
                    className="no-break"
                  >
                    <Grid container spacing={2.5}>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1">Orelha Esquerda</Typography>
                          {dados?.impedanciometria?.cs_recusa === true ? (
                            <Typography variant="body1" align="justify">
                              A movimentação da cabeça durante o exame prejudicou a captação da curva timpânica.
                            </Typography>
                          ) : dados?.impedanciometria?.oe_curva === 'A' ? (
                            <Typography variant="body1" align="justify">
                              Passa com curva tipo A e presença de reflexos de 500HZ à 4KHZ.
                            </Typography>
                          ) : dados?.impedanciometria?.oe_curva === 'B' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : dados?.impedanciometria?.oe_curva === 'C' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : dados?.impedanciometria?.oe_curva === 'D' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : dados?.impedanciometria?.oe_curva === 'S' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : (
                            <Typography></Typography>
                          )}
                        </MainCard>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1">Orelha Direita</Typography>
                          {dados?.impedanciometria?.cs_recusa === true ? (
                            <Typography variant="body1" align="justify">
                              A movimentação da cabeça durante o exame prejudicou a captação da curva timpânica.
                            </Typography>
                          ) : dados?.impedanciometria?.od_curva === 'A' ? (
                            <Typography variant="body1" align="justify">
                              Passa com curva tipo A e presença de reflexos de 500HZ à 4KHZ.
                            </Typography>
                          ) : dados?.impedanciometria?.od_curva === 'B' ? (
                            <Typography>
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : dados?.impedanciometria?.od_curva === 'C' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : dados?.impedanciometria?.od_curva === 'D' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : dados?.impedanciometria?.od_curva === 'S' ? (
                            <Typography variant="body1" align="justify">
                              Falha na formação de curva timpanométrica, diferente do parâmetro estabelecido em triagem.
                            </Typography>
                          ) : (
                            <Typography></Typography>
                          )}
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="h5">Otoemissão</Typography>

                        <Typography variant="body1" align="justify">
                          Critério de normalidade: `PASSA` para achados dentro dos parâmetros de triagem auditiva com presença de emissões
                          otoacústica (EOA) por cliques transientes em ambas as orelhas. Relação sinal/ruído igual ou superior a 6 dB em
                          pelo menos três bandas de frequência testadas. Critérios adotados de acordo com o sugerido pelo fabricante do
                          equipamento automático portátil ERO-SCAN™ da marca Maico.
                        </Typography>
                      </>
                    }
                    sx={{ height: '100%' }}
                    className="no-break"
                  >
                    <Grid container spacing={2.5}>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1" gutterBottom>
                            Orelha Esquerda
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                            Exame: EOA Produto de Distorção
                          </Typography>

                          {dados?.otoemissao?.cs_recusa === true ? (
                            <Typography variant="body1" gutterBottom>
                              Não foi possível estabilizar a sonda para a iniciar o exame, pois a criança apresentou sensibilidade e
                              movimentos corporais de recusa.
                            </Typography>
                          ) : dados?.otoemissao?.oe_eoa_distorcao === true ? (
                            <Typography variant="body1" gutterBottom>
                              Passa, presença de reprodutibilidade das emissões nos critérios estabelecidos em triagem.
                            </Typography>
                          ) : (
                            <Typography variant="body1" gutterBottom>
                              Falha, emissões otoacústicas ausentes.
                            </Typography>
                          )}

                          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                            Exame: EOA Transiente
                          </Typography>

                          {dados?.otoemissao?.cs_recusa === true ? (
                            <Typography>
                              Não foi possível estabilizar a sonda para a iniciar o exame, pois a criança apresentou sensibilidade e
                              movimentos corporais de recusa.
                            </Typography>
                          ) : dados?.otoemissao?.oe_eoa_transiente === true ? (
                            <Typography>
                              Passa, presença de reprodutibilidade das emissões nos critérios estabelecidos em triagem.
                            </Typography>
                          ) : (
                            <Typography>Falha, emissões otoacústicas ausentes.</Typography>
                          )}
                        </MainCard>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1" gutterBottom>
                            Orelha Direita
                          </Typography>

                          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                            Exame: EOA Produto de Distorção
                          </Typography>

                          {dados?.otoemissao?.cs_recusa === true ? (
                            <Typography gutterBottom>
                              Não foi possível estabilizar a sonda para a iniciar o exame, pois a criança apresentou sensibilidade e
                              movimentos corporais de recusa.
                            </Typography>
                          ) : dados?.otoemissao?.od_eoa_distorcao === true ? (
                            <Typography gutterBottom>
                              Passa, presença de reprodutibilidade das emissões nos critérios estabelecidos em triagem.
                            </Typography>
                          ) : (
                            <Typography gutterBottom>Falha, emissões otoacústicas ausentes.</Typography>
                          )}

                          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                            Exame: EOA Transiente
                          </Typography>
                          {dados?.otoemissao?.cs_recusa === true ? (
                            <Typography>
                              Não foi possível estabilizar a sonda para a iniciar o exame, pois a criança apresentou sensibilidade e
                              movimentos corporais de recusa.
                            </Typography>
                          ) : dados?.otoemissao?.od_eoa_transiente === true ? (
                            <Typography>
                              Passa, presença de reprodutibilidade das emissões nos critérios estabelecidos em triagem.
                            </Typography>
                          ) : (
                            <Typography>Falha, emissões otoacústicas ausentes.</Typography>
                          )}
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <>
                        <Typography variant="h5">Audiometria</Typography>
                        <Typography variant="body1" gutterBottom>
                          Critério de normalidade: `PASSA` dentro dos parâmetros para triagem auditiva: Resposta ao estímulo aplicado em 20
                          dB para todas as frequências testadas 1000HZ à 4000HZ, com técnica de varredura. Conforme a Resolução N° 274, de
                          20 de Abril, 2001.
                        </Typography>
                        {dados?.audiometria?.cs_tecnica === null ? (
                          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                            Tecnica: Convencional
                          </Typography>
                        ) : dados?.audiometria?.cs_tecnica === 'Campo Livre' ? (
                          <>
                            <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                              Tecnica: Campo Livre
                            </Typography>
                            <Typography variant="body1" align="justify">
                              Utilizamos a técnica em campo livre para colher respostas auditivas na audiometria. O som foi aplicado em
                              frequências de fala 500Hz, 1kHz e 2kHz à 80, 60, 40 e 20dBNA, com reforço visual, para analisar as reações aos
                              estímulos sonoros aplicados. Teste realizado de forma lúdica e condicionada, com reforço visual e confirmação
                              do limiar tonal na audiometria vocal, com estratégia de resgate de informações com uso de animais e partes do
                              corpo.
                            </Typography>
                          </>
                        ) : dados?.audiometria?.cs_tecnica === 'Bandinha' ? (
                          <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} color="text.secondary">
                            Tecnica: Bandinha
                          </Typography>
                        ) : (
                          ''
                        )}
                      </>
                    }
                    sx={{ height: '100%' }}
                    className="no-break"
                  >
                    <Grid container spacing={2.5}>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1">Orelha Esquerda</Typography>
                          {dados?.audiometria?.cs_recusa === true ? (
                            <Typography variant="body1" align="justify">
                              A movimentação da cabeça durante o exame prejudicou a captação da curva timpânica.
                            </Typography>
                          ) : dados.audiometria?.cs_tecnica === null ? (
                            dados?.audiometria?.oe_audio === true ? (
                              <Typography variant="body1" align="justify">
                                Passou no teste, respondeu aos estímulos aplicados nas frequências testadas a 20 dB. O resultado é
                                considerado satisfatório.
                              </Typography>
                            ) : (
                              <Typography variant="body1" align="justify">
                                Falha, seguindo o parâmetro de triagem, as respostas aos estímulos aplicados apresentaram acima do critério
                                de normalidade.
                              </Typography>
                            )
                          ) : dados?.audiometria?.cs_tecnica === 'Campo Livre' ? (
                            dados?.audiometria?.oe_audio === true ? (
                              <Typography variant="body1" align="justify">
                                Passou no teste, respondendo aos estímulos aplicados nas frequências testadas a 20 dB. O resultado indica
                                normalidade.
                              </Typography>
                            ) : (
                              <Typography variant="body1" align="justify">
                                Falha, seguindo o parâmetro de triagem, a criança respondeu aos estímulos auditivos sonoros em intensidade
                                acima do critério estabelecido.
                              </Typography>
                            )
                          ) : dados?.audiometria?.cs_tecnica === 'Bandinha' ? (
                            dados?.audiometria?.oe_audio === true ? (
                              <Typography variant="body1" align="justify">
                                A criança demonstrou atenção ao som e à localização direta, apresentando um comportamento auditivo
                                considerado normal para a idade, sugerindo um resultado dentro da normalidade.
                              </Typography>
                            ) : (
                              <Typography variant="body1" align="justify">
                                Não foi observado atenção ao som apresentado em fraca/média intensidade, localização indireta, apresentando
                                falha no comportamento auditivo.
                              </Typography>
                            )
                          ) : (
                            ''
                          )}
                        </MainCard>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <MainCard>
                          <Typography variant="subtitle1">Orelha Direita</Typography>
                          {dados?.audiometria?.cs_recusa === true ? (
                            <Typography variant="body1" align="justify">
                              A movimentação da cabeça durante o exame prejudicou a captação da curva timpânica.
                            </Typography>
                          ) : dados?.audiometria?.cs_tecnica === null ? (
                            dados?.audiometria?.od_audio === true ? (
                              <Typography variant="body1" align="justify">
                                Passou no teste, respondeu aos estímulos aplicados nas frequências testadas a 20 dB. O resultado é
                                considerado satisfatório.
                              </Typography>
                            ) : (
                              <Typography variant="body1" align="justify">
                                Falha, seguindo o parâmetro de triagem, as respostas aos estímulos aplicados apresentaram acima do critério
                                de normalidade.
                              </Typography>
                            )
                          ) : dados?.audiometria?.cs_tecnica === 'Campo Livre' ? (
                            dados?.audiometria?.od_audio === true ? (
                              <Typography variant="body1" align="justify">
                                Passou no teste, respondendo aos estímulos aplicados nas frequências testadas a 20 dB. O resultado indica
                                normalidade.
                              </Typography>
                            ) : (
                              <Typography variant="body1" align="justify">
                                Falha, seguindo o parâmetro de triagem, a criança respondeu aos estímulos auditivos sonoros em intensidade
                                acima do critério estabelecido.
                              </Typography>
                            )
                          ) : dados?.audiometria?.cs_tecnica === 'Bandinha' ? (
                            dados?.audiometria?.od_audio === true ? (
                              <Typography variant="body1" align="justify">
                                A criança demonstrou atenção ao som e à localização direta, apresentando um comportamento auditivo
                                considerado normal para a idade, sugerindo um resultado dentro da normalidade.
                              </Typography>
                            ) : (
                              <Typography variant="body1" align="justify">
                                Não foi observado atenção ao som apresentado em fraca/média intensidade, localização indireta, apresentando
                                falha no comportamento auditivo.
                              </Typography>
                            )
                          ) : (
                            ''
                          )}
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                {dados.ds_conclusao ? (
                  <Grid item xs={12} sm={12}>
                    <MainCard title={<Typography variant="h5">Conclusão</Typography>} className="no-break">
                      <Typography variant="body1" align="justify" sx={{ whiteSpace: 'pre-line' }}>
                        {dados?.ds_conclusao}
                      </Typography>
                    </MainCard>
                  </Grid>
                ) : (
                  ''
                )}
                {dados.ds_comportamento_auditivo ? (
                  <Grid item xs={12} sm={12}>
                    <MainCard title={<Typography variant="h5">Comportamento Auditivo</Typography>} className="no-break">
                      <Typography variant="body1" align="justify" sx={{ whiteSpace: 'pre-line' }}>
                        {dados?.ds_comportamento_auditivo}
                      </Typography>
                    </MainCard>
                  </Grid>
                ) : (
                  ''
                )}
                {dados.ds_observacao ? (
                  <Grid item xs={12} sm={12}>
                    <MainCard title={<Typography variant="h5">Observação</Typography>} className="no-break">
                      <Typography variant="body1" align="justify" sx={{ whiteSpace: 'pre-line' }}>
                        {dados?.ds_observacao}
                      </Typography>
                    </MainCard>
                  </Grid>
                ) : (
                  ''
                )}
                {dados.ds_fonologia ? (
                  <Grid item xs={12} sm={12}>
                    <MainCard title={<Typography variant="h5">Fonologia</Typography>} className="no-break">
                      <Typography variant="body1" align="justify" sx={{ whiteSpace: 'pre-line' }}>
                        {dados?.ds_fonologia}
                      </Typography>
                    </MainCard>
                  </Grid>
                ) : (
                  ''
                )}
                {dados.ds_rastreio_pac ? (
                  <Grid item xs={12} sm={12}>
                    <MainCard title={<Typography variant="h5">Rastreio do PAC</Typography>} className="no-break">
                      <Typography variant="body1" align="justify" sx={{ whiteSpace: 'pre-line' }}>
                        {dados?.ds_rastreio_pac}
                      </Typography>
                    </MainCard>
                  </Grid>
                ) : (
                  ''
                )}
                {dados.ds_encaminhamento ? (
                  <Grid item xs={12} sm={12}>
                    <MainCard title={<Typography variant="h5">Encaminhamento</Typography>} className="no-break">
                      <Typography variant="body1" align="justify" sx={{ whiteSpace: 'pre-line' }}>
                        {dados?.ds_encaminhamento}
                      </Typography>
                    </MainCard>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="footer">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack sx={{ ml: 3 }}>
                      <CardMedia component="img" src={rodape} alt="Logo" sx={{ width: 170, height: 60 }} />
                    </Stack>
                    <Stack sx={{ mr: 3 }}>
                      <CardMedia component="img" src={assinatura} alt="Logo" sx={{ width: 90, height: 70 }} />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" textAlign="center">
                    Em caso de dúvida sobre os resultados da triagem auditiva, por favor, entre em contato com a responsável Gláucia
                    Magalhães através do WhatsApp (61) 9 9195-6966.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Voltar
            </Button>
          </Stack>
        </Box>
      </MainCard>
    </Page>
  );
};

TabLaudoForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

TabLaudoForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabLaudoForm;

/*
import 'dayjs/locale/de';
import 'dayjs/locale/zh-cn';
import { useFormik } from 'formik';
import Layout from 'layout';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const FechamentoAuditivo2Form = (props) => {
  const { title } = props;

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = router.query;

  let initialValues2 = {
    cs_recusa: false,
    cs_n_1: false,
    cs_n_2: false,
    cs_n_3: false,
    cs_n_4: false,
    cs_n_5: false,
    cs_n_6: false,
    cs_i_1: false,
    cs_i_2: false,
    cs_i_3: false,
    cs_i_4: false,
    cs_i_5: false,
    cs_i_6: false,
    cs_r_1: undefined,
    cs_r_2: undefined,
    cs_r_3: undefined,
    cs_r_4: undefined,
    cs_r_5: undefined,
    cs_r_6: undefined
  };

const formik = useFormik({
  initialValues: initialValues2,
  validationSchema: Yup.object().shape({
    cs_recusa: Yup.boolean(),
    cs_n_1: Yup.boolean(),
    cs_n_2: Yup.boolean(),
    cs_n_3: Yup.boolean(),
    cs_n_4: Yup.boolean(),
    cs_n_5: Yup.boolean(),
    cs_n_6: Yup.boolean(),
    cs_i_1: Yup.boolean(),
    cs_i_2: Yup.boolean(),
    cs_i_3: Yup.boolean(),
    cs_i_4: Yup.boolean(),
    cs_i_5: Yup.boolean(),
    cs_i_6: Yup.boolean(),
    cs_r_1: Yup.boolean(),
    cs_r_2: Yup.boolean(),
    cs_r_3: Yup.boolean(),
    cs_r_4: Yup.boolean(),
    cs_r_5: Yup.boolean(),
    cs_r_6: Yup.boolean()
  }),
  onSubmit: (values) => {
    try {
      console.log('submit funcionou', values);
    } catch (error) {
      console.error(error);
    }
  }
});

  function contarValoresTrue(objeto) {
    let contador = 0;
    for (const chave in objeto) {
      if (chave.startsWith('cs_r_') && objeto[chave] === true) {
        contador++;
      }
    }
    return ((contador / 6) * 100).toFixed(2) + '%';
  }

const changeValue = (campo, valor) => {
  if (valor === 'true') {
    setFieldValue(campo, true);
  }

  if (valor === 'false') {
    setFieldValue(campo, false);
  }
};

function contarValoresTrue4(campo1, campo2, campo3, campo4) {
  let objeto = {
    col1: campo1,
    col2: campo2,
    col3: campo3,
    col4: campo4
  };
  let contagem = 0;
  for (let chave in objeto) {
    if (objeto[chave] === true) {
      contagem++;
    }
  }
  return contagem;
}

function contarValoresTrue2(od, oe, campo1, campo2, campo3, campo4) {
  let objeto = {
    od: od,
    oe: oe,
    od_1: campo1,
    od_2: campo2,
    oe_1: campo3,
    oe_2: campo4
  };

  let contagemOd = 0;
  let contagemOe = 0;

  // Verifica os atributos relacionados a "od"
  if (objeto?.od === true) {
    if (objeto?.od_1 === true) contagemOd++;
    if (objeto?.od_2 === true) contagemOd++;
  }

  // Verifica os atributos relacionados a "oe"
  if (objeto?.oe === true) {
    if (objeto?.oe_1 === true) contagemOe++;
    if (objeto?.oe_2 === true) contagemOe++;
  }

  let total = contagemOd + contagemOe;
  return total;
}

  const atualizar = (values) => {

    // setResultado(contarValoresTrue(values));

    setSubmitting(true);
    dispatch(editar(values.id_localizacao_sonora, values))
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Localização Sonora atualizada com sucesso!',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          })
        );
      })
      .finally(() => {
        dispatch(getId(id));
        setSubmitting(false);
      });
  };

  const [openTeste, setOpenTeste] = useState(false);

  const handleOpenTeste = (open) => {
    setOpenTeste(open);
  };

  const [openExame, setOpenExame] = useState(false);

  const handleOpenExame = (open) => {
    setOpenExame(open);
  };

const { values, handleSubmit, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

  return (
    <Page title={title}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <MainCard
            title="Fechamento Auditivo Frase"
            content={false}
            secondary={
              <>
                <FormControl>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="cs_recusa"
                          checked={values.cs_recusa}
                          onChange={handleChange}
                          color="secondary"
                          className="size-medium"
                        />
                      }
                      label="Recusa"
                      labelPlacement="top"
                    />
                  </FormGroup>
                </FormControl>
              </>
            }
          >
            <CardContent>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                Card Subtitle
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non libero dignissim, viverra augue eu.
              </Typography>
            </CardContent>
            <Divider />
            <ToggleButtonGroup
              fullWidth
              color="primary"
              exclusive
              aria-label="text alignment"
              size="small"
              sx={{
                p: 1,
                '& .MuiToggleButton-root': {
                  borderRadius: 0,
                  p: 0.75,
                  '&:not(.Mui-selected)': {
                    borderTopColor: 'transparent',
                    borderBottomColor: 'transparent'
                  },
                  '&:first-of-type': {
                    borderLeftColor: 'transparent'
                  },
                  '&:last-of-type': {
                    borderRightColor: 'transparent'
                  },
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: theme.palette.primary.main
                  }
                }
              }}
            >
              <ToggleButton value="web" aria-label="web" disableRipple>
                <Button variant="shadow" color="secondary" onClick={() => handleOpenTeste(true)}>
                  Teste
                </Button>
              </ToggleButton>
              {values.cs_recusa === true ? (
                <ToggleButton value="android" aria-label="android" disableRipple>
                  <Button variant="shadow" color="secondary" onClick={() => atualizar(values)}>
                    Salvar Recusa
                  </Button>
                </ToggleButton>
              ) : values.cs_n_1 === false && values.cs_i_1 === false && values.cs_r_1 === undefined ? (
                <ToggleButton value="android" aria-label="android" disableRipple>
                  <Button variant="shadow" color="success" onClick={() => handleOpenExame(true)}>
                    Iniciar
                  </Button>
                </ToggleButton>
              ) : (
                <ToggleButton value="ios" aria-label="ios" disableRipple>
                  <>
                    <Stack direction="column" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                      <Box>
                        <Typography variant="subtitle1">Resultado</Typography>
                      </Box>
                      <Box>
                        <Typography>{contarValoresTrue(values)}</Typography>
                      </Box>
                    </Stack>
                  </>
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          </MainCard>

          <Dialog
            maxWidth="xs"
            fullWidth
            open={openTeste}
            onClose={() => {
              setOpenTeste(false);
            }}
          >
            <DialogTitle>Teste de Fechamento Auditivo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Durante a leitura de uma história, você será solicitado a identificar a figura correspondente. Esteja atento!
              </DialogContentText>
              <br />
              <DialogContentText>Veja os exemplos antes de prosseguir</DialogContentText>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <MainCard
                      title={
                        <Typography variant="subtitle1" textAlign="center">
                          Diga a ordem dos sons que ouviu:
                        </Typography>
                      }
                      content={false}
                    >
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                          <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="error" />
                          <Typography variant="subtitle1" textAlign="center">
                            1. Que ignore o fim principal é ganhar
                          </Typography>
                        </Stack>
                      </CardContent>
                      <Divider />
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                          <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="error" />
                          <Typography variant="subtitle1" textAlign="center">
                            2. A porta larga para ser mais rápido
                          </Typography>
                        </Stack>
                      </CardContent>
                      <Divider />
                    </MainCard>
                  </Grid>
                </Grid>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenTeste(false);
                }}
              >
                Fechar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openExame}
            onClose={() => {
              setOpenExame(false);
            }}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              <Typography variant="h3" textAlign="center">
                Exame de Fechamento Auditivo
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MainCard
                    title={
                      <Typography variant="subtitle1" textAlign="center">
                        Durante a leitura de uma história, você será solicitado a identificar a figura correspondente. Esteja atento!
                      </Typography>
                    }
                    content={false}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        <MainCard
                          title={
                            <Grid container spacing={3}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">Play</Typography>
                                </Stack>
                              </Grid>

                              <Grid item xs={10}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Typography variant="subtitle1">Frases</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          }
                          content={false}
                        >
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={2}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <AudioPlayerCircle src="/assets/audios/03 Track 3-ssw.mp3" variant="contained" color="success" />
                                </Stack>
                              </Grid>
                              <Grid item xs={5}>
                                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                  <Grid item>
                                    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                                      <Button
                                        variant={values.cs_frase_1 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        onClick={() => {
                                          setFieldValue('cs_frase_1', !values.cs_frase_1);
                                        }}
                                      >
                                        <Typography variant="h6" textAlign="left">
                                          1. Que ignore o fim principal é ganhar
                                        </Typography>
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_2 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_2', !values.cs_frase_2);
                                        }}
                                      >
                                        2. A porta larga para ser mais rápido
                                      </Button>

                                      <Button
                                        variant={values.cs_frase_3 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_3', !values.cs_frase_3);
                                        }}
                                      >
                                        3. Gosta muito crer te dá muito para
                                      </Button>

                                      <Button
                                        variant={values.cs_frase_4 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_4', !values.cs_frase_4);
                                        }}
                                      >
                                        4. Quarto golpe de estado e o campo
                                      </Button>

                                      <Button
                                        variant={values.cs_frase_5 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_5', !values.cs_frase_5);
                                        }}
                                      >
                                        5. Sempre e corre muito mais bonito que
                                      </Button>
                                    </ButtonGroup>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={5}>
                                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                  <Grid item>
                                    <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                                      <Button
                                        variant={values.cs_frase_6 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_6', !values.cs_frase_6);
                                        }}
                                      >
                                        6. Confiança em minha alma cai dentro de
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_7 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_7', !values.cs_frase_7);
                                        }}
                                      >
                                        7. Ação humilde é bem claro o céu
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_8 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_8', !values.cs_frase_8);
                                        }}
                                      >
                                        8. Sobre minha cabeça está de Deus pai
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_9 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_9', !values.cs_frase_9);
                                        }}
                                      >
                                        9. Grande general chega já e não creias
                                      </Button>
                                      <Button
                                        variant={values.cs_frase_10 === true ? 'contained' : 'outlined'}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                          setFieldValue('cs_frase_10', !values.cs_frase_10);
                                        }}
                                      >
                                        10. Assista a aula de papel branco na
                                      </Button>
                                    </ButtonGroup>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </MainCard>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setOpenExame(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  atualizar(values);
                  setOpenExame(false);
                }}
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
                variant="contained"
                color="primary"
              >
                Concluir
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </FormikProvider>
    </Page>
  );
};

FechamentoAuditivo2Form.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

FechamentoAuditivo2Form.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default FechamentoAuditivo2Form;
*/

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout/index';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/impedanciometria';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
// ==============================|| ACCOUNT PROFILE - MY ACCOUNT ||============================== //

const TabImpedanciometriaForm = (props) => {
  const { initialValues } = props;

  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues.impedanciometria,
    validationSchema: null,
    onSubmit: (values) => {
      try {
        setSubmitting(true);
        dispatch(editar(values.id_impedanciometria, values))
          .then(() => {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Impedanciometria atualizada com sucesso!',
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
      } catch (error) {
        console.error(error);
      }
    }
  });

  const onCancel = () => {
    router.push('/core/prontuario');
  };

  const { values, handleChange, handleBlur, isSubmitting, setSubmitting, handleSubmit } = formik;

  const campos = ['od_curva', 'oe_curva'];

  useEffect(() => {
    values.cs_recusa === true
      ? campos.forEach((campo) => {
          formik.setFieldValue(campo, null);
        })
      : formik.setFieldValue('ds_impedanciometria', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.cs_recusa]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MainCard
              title="Impedanciometria"
              content={false}
              secondary={
                <>
                  <FormControl>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="cs_recusa"
                            checked={Boolean(values.cs_recusa)}
                            value={Boolean(values.cs_recusa)}
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
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <List sx={{ p: 0 }}>
                    <ListItem divider>
                      <ListItemText id="curva" primary="Orelha Esquerda" secondary="O Paciente apresenta qual tipo de curva ?" />
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <ToggleButtonGroup
                            value={values.oe_curva}
                            color="primary"
                            exclusive
                            onChange={(event, newValue) => {
                              if (newValue !== null) {
                                formik.setFieldValue('oe_curva', newValue);
                              }
                            }}
                            aria-label="text alignment"
                            sx={{
                              '& .MuiToggleButton-root': {
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
                                '&.Mui-selected': {
                                  borderColor: 'inherit',
                                  borderLeftColor: `${theme.palette.primary.main} !important`,
                                  '&:hover': {
                                    bgcolor: theme.palette.primary.lighter
                                  }
                                },
                                '&:hover': {
                                  bgcolor: 'transparent',
                                  borderColor: theme.palette.primary.main,
                                  borderLeftColor: `${theme.palette.primary.main} !important`,
                                  zIndex: 2
                                }
                              }
                            }}
                          >
                            <ToggleButton id="oe_curva_a" value="A" aria-label="a" disabled={values.cs_recusa === true ? true : false}>
                              A
                            </ToggleButton>
                            <ToggleButton id="oe_curva_b" value="B" aria-label="b" disabled={values.cs_recusa === true ? true : false}>
                              B
                            </ToggleButton>
                            <ToggleButton id="oe_curva_c" value="C" aria-label="c" disabled={values.cs_recusa === true ? true : false}>
                              C
                            </ToggleButton>
                            <ToggleButton id="oe_curva_d" value="D" aria-label="ad" disabled={values.cs_recusa === true ? true : false}>
                              AD
                            </ToggleButton>
                            <ToggleButton id="oe_curva_s" value="S" aria-label="as" disabled={values.cs_recusa === true ? true : false}>
                              AS
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Box>
                      </Stack>
                    </ListItem>
                    <ListItem divider>
                      <ListItemText id="curva" primary="Orelha Direita" secondary="O Paciente apresenta qual tipo de curva ?" />
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'flex', ml: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <ToggleButtonGroup
                            value={values.od_curva}
                            color="error"
                            exclusive
                            onChange={(event, newValue) => {
                              if (newValue !== null) {
                                formik.setFieldValue('od_curva', newValue);
                              }
                            }}
                            aria-label="text alignment"
                            sx={{
                              '& .MuiToggleButton-root': {
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
                                '&.Mui-selected': {
                                  borderColor: 'inherit',
                                  borderLeftColor: `${theme.palette.error.main} !important`,
                                  '&:hover': {
                                    bgcolor: theme.palette.error.lighter
                                  }
                                },
                                '&:hover': {
                                  bgcolor: 'transparent',
                                  borderColor: theme.palette.error.main,
                                  borderLeftColor: `${theme.palette.error.main} !important`,
                                  zIndex: 2
                                }
                              }
                            }}
                          >
                            <ToggleButton value="A" aria-label="a" disabled={values.cs_recusa === true ? true : false}>
                              A
                            </ToggleButton>
                            <ToggleButton value="B" aria-label="b" disabled={values.cs_recusa === true ? true : false}>
                              B
                            </ToggleButton>
                            <ToggleButton value="C" aria-label="c" disabled={values.cs_recusa === true ? true : false}>
                              C
                            </ToggleButton>
                            <ToggleButton value="D" aria-label="ad" disabled={values.cs_recusa === true ? true : false}>
                              AD
                            </ToggleButton>
                            <ToggleButton value="S" aria-label="as" disabled={values.cs_recusa === true ? true : false}>
                              AS
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Box>
                      </Stack>
                    </ListItem>
                  </List>
                </Grid>
                {values.cs_recusa === true ? (
                  <Grid item xs={12} sm={12}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={3}
                      sx={{ p: 3, a: { textDecoration: 'none', color: 'inherit' } }}
                    >
                      <TextField
                        id="ds_impedanciometria"
                        name="ds_impedanciometria"
                        label={<FormattedMessage id={'prontuario.cs_recusa'} />}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={Infinity}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.ds_impedanciometria}
                      />
                    </Stack>
                  </Grid>
                ) : null}
              </Grid>
            </MainCard>
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
  );
};

TabImpedanciometriaForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

TabImpedanciometriaForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabImpedanciometriaForm;

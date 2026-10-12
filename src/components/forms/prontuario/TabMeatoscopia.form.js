import {
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
  Switch
} from '@mui/material';
import { TextField } from '@mui/material/index';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout/index';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { editar, getMeatoscopiaId } from 'store/reducers/meatoscopia';
import { openSnackbar } from 'store/reducers/snackbar';
// ==============================|| MEATOSCOPIA ||============================== //

const TabMeatoscopiaForm = (props) => {
  const { initialValues } = props;
  // eslint-disable-next-line no-unused-vars
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues.meatoscopia,
    validationSchema: null,
    onSubmit: (values) => {
      try {
        setSubmitting(true);
        dispatch(editar(values.id_meatoscopia, values))
          .then(() => {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Meatoscopia atualizada com sucesso!',
                variant: 'alert',
                alert: {
                  color: 'success'
                }
              })
            );
          })
          .finally(() => {
            dispatch(getMeatoscopiaId(id));
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

  const { values, handleSubmit, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = formik;

  const odFields = ['od_cera', 'od_inflamado', 'od_corpo_estranho', 'od_normal'];
  const oeFields = ['oe_cera', 'oe_inflamado', 'oe_corpo_estranho', 'oe_normal'];
  const campos = ['od_cera', 'od_inflamado', 'od_corpo_estranho', 'od_normal', 'oe_cera', 'oe_inflamado', 'oe_corpo_estranho', 'oe_normal'];

  const handleExclusiveToggle = (fieldName, value) => {
    const group = fieldName.startsWith('od_') ? odFields : oeFields;
    group.forEach((field) => {
      setFieldValue(field, field === fieldName ? value : false);
    });
  };

  useEffect(() => {
    values.cs_recusa === true
      ? campos.forEach((campo) => {
          formik.setFieldValue(campo, null);
        })
      : formik.setFieldValue('ds_meatoscopia', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.cs_recusa]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <MainCard
          title="Meatoscopia"
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
                  <ListItemText id="direita" primary="Orelha Esquerda" secondary="Selecione o que foi encontrado durante o diagnostico" />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="oe_cera"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.oe_cera)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => handleExclusiveToggle('oe_cera', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="primary"
                      />
                    }
                    label="Cera"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="oe_inflamado"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.oe_inflamado)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('oe_inflamado', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="primary"
                      />
                    }
                    label="Inflamado"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="oe_corpo_estranho"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.oe_corpo_estranho)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('oe_corpo_estranho', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="primary"
                      />
                    }
                    label="Corpo Estranho"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    sx={{ color: 'text.primary' }}
                    control={
                      <Switch
                        edge="end"
                        name="oe_normal"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.oe_normal)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('oe_normal', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="primary"
                      />
                    }
                    label="Normal"
                    labelPlacement="top"
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText id="direita" primary="Orelha Direita" secondary="Selecione o que foi encontrado durante o diagnostico" />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="od_cera"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.od_cera)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('od_cera', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="error"
                      />
                    }
                    label="Cera"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="od_inflamado"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.od_inflamado)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('od_inflamado', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="error"
                      />
                    }
                    label="Inflamado"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="od_corpo_estranho"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.od_corpo_estranho)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('od_corpo_estranho', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="error"
                      />
                    }
                    label="Corpo Estranho"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        edge="end"
                        name="od_normal"
                        control={<Switch color="primary" />}
                        checked={Boolean(values.od_normal)}
                        disabled={values.cs_recusa === true ? true : false}
                        onBlur={handleBlur}
                        onChange={(e) => handleExclusiveToggle('od_normal', e.target.checked)}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-ln'
                        }}
                        color="error"
                      />
                    }
                    label="Normal"
                    labelPlacement="top"
                  />
                </ListItem>
              </List>
            </Grid>
            {values.cs_recusa === true ? (
              <Grid item xs={12} sm={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={3} sx={{ p: 3, a: { textDecoration: 'none', color: 'inherit' } }}>
                  <TextField
                    id="ds_meatoscopia"
                    name="ds_meatoscopia"
                    label={<FormattedMessage id={'prontuario.cs_recusa'} />}
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={Infinity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ds_meatoscopia}
                  />
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        </MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              sx={{ mt: 3, a: { textDecoration: 'none', color: 'inherit' } }}
            >
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

TabMeatoscopiaForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

TabMeatoscopiaForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabMeatoscopiaForm;

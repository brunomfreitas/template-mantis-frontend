import { CircularProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Form, FormikProvider, useFormik } from 'formik';
import Layout from 'layout/index';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useDispatch } from 'store';
import { editar } from 'store/reducers/audiometria';
import { getId } from 'store/reducers/prontuario';
import { openSnackbar } from 'store/reducers/snackbar';
import * as Yup from 'yup';
import DicoticoDigitosForm from '../pac/dicotico-digitos/dicotico-digitos.forms';
import DicoticoSequencialForm from '../pac/dicotico-sequencial/dicotico-sequencial.form';
import FechamentoAuditivoFiguraForm from '../pac/fechamento-auditivo/fechamento-auditivo-figura.form';
import FechamentoAuditivoFraseForm from '../pac/fechamento-auditivo/fechamento-auditivo-frase.form';
import { default as LocalizacaoSonoraForm } from '../pac/localizacao-sonora/localizacao-sonora.form';
import OrdenacaoTemporalForm from '../pac/ordenacao-temporal/ordenacao-temporal.form';
import ResolucaoTemporalForm from '../pac/resolucao-temporal/resolucao-temporal-form';
import TesteSom from '../pac/teste-som/teste-som.form';

// ==============================|| ACCOUNT PROFILE - MY ACCOUNT ||============================== //

const TabPacAtendimentoForm = (props) => {
  const { initialValues } = props;

  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      id_agendamento: Yup.number()
        .max(255)
        .required(intl.formatMessage({ id: 'prontuario.id_agendamento' }) + intl.formatMessage({ id: 'isRequired' })),
      id_fonoaudiologo: Yup.number().required(
        intl.formatMessage({ id: 'prontuario.id_fonoaudiologo' }) + intl.formatMessage({ id: 'isRequired' })
      ),
      id_assistente: Yup.number().required(
        intl.formatMessage({ id: 'prontuario.id_assistente' }) + intl.formatMessage({ id: 'isRequired' })
      )
    }),
    onSubmit: () => {
      try {
      } catch (error) {
        console.error(error);
      }
    }
  });

  const atualizar = (values) => {
    setSubmitting(true);
    dispatch(editar(values.id_audiometria, values))
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Audiometria atualizada com sucesso!',
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

  const { values, handleSubmit, isSubmitting, setSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TesteSom />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizacaoSonoraForm initialValues={initialValues.pac?.localizacao_sonora} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DicoticoDigitosForm initialValues={initialValues.pac?.dicotico_digitos} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <OrdenacaoTemporalForm initialValues={initialValues.pac?.ordenacao_temporal} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DicoticoSequencialForm initialValues={initialValues.pac?.dicotico_sequencial} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ResolucaoTemporalForm initialValues={initialValues.pac?.resolucao_temporal} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FechamentoAuditivoFiguraForm initialValues={initialValues.pac?.fechamento_auditivo} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FechamentoAuditivoFraseForm initialValues={initialValues.pac?.fechamento_auditivo} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button variant="outlined" color="secondary">
                Voltar
              </Button>
              <Button
                onClick={() => atualizar(values)}
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

TabPacAtendimentoForm.propTypes = {
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

TabPacAtendimentoForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TabPacAtendimentoForm;

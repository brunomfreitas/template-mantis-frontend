import { Grid } from '@mui/material';
import FechamentoAuditivoFiguraForm from 'components/forms/pac/fechamento-auditivo/fechamento-auditivo-figura.form';
// import DicoticoDigitosForm from 'components/forms/pac/dicotico-digitos/dicotico-digitos.forms';
// import DicoticoSequencialForm from 'components/forms/pac/dicotico-sequencial/dicotico-sequencial.form';
// import FechamentoAuditivoFiguraForm from 'components/forms/pac/fechamento-auditivo/fechamento-auditivo-figura.form';
// import FechamentoAuditivoFraseForm from 'components/forms/pac/fechamento-auditivo/fechamento-auditivo-frase.form';
// import LocalizacaoSonoraForm from 'components/forms/pac/localizacao-sonora/localizacao-sonora.form';
// import OrdenacaoTemporalForm from 'components/forms/pac/ordenacao-temporal/ordenacao-temporal.form';
// import ResolucaoTemporalForm from 'components/forms/pac/resolucao-temporal/resolucao-temporal-form';
import { useFormikContext } from 'formik';
import Layout from 'layout';
import PropTypes from 'prop-types';

const TabTriagemForm = (props) => {
    const { state, anos } = props;

    const {
        values
        // errors, touched, handleSubmit, handleBlur, handleChange, setFieldValue, getFieldProps
    } = useFormikContext();

    return (
        <>
            <Grid container spacing={3}>
                {/* <Grid item xs={12} sm={4}>
                    <TesteSom />
                </Grid> */}
                {/* <Grid item xs={12} sm={4}>
                    <LocalizacaoSonoraForm initialValues={{}} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DicoticoDigitosForm initialValues={{}} />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <OrdenacaoTemporalForm initialValues={{}} />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <DicoticoSequencialForm initialValues={{}} />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <ResolucaoTemporalForm initialValues={{}} />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FechamentoAuditivoFiguraForm initialValues={data?.figura_fundo[0]} />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FechamentoAuditivoFraseForm initialValues={{}} />
                </Grid> */}
                {values.pac[0]?.figura_fundo && (
                    <Grid item xs={12} sm={4}>
                        <FechamentoAuditivoFiguraForm title={'Fechamento Auditivo Figura Triagem'} state={state} anos={anos} />
                    </Grid>
                )}
            </Grid>
        </>
    );
};

TabTriagemForm.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string
};

TabTriagemForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabTriagemForm;

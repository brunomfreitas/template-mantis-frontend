import { Grid, Typography } from '@mui/material';
// import DicoticoDigitosForm from 'components/forms/pac/dicotico-digitos/dicotico-digitos.forms';
// import DicoticoSequencialForm from 'components/forms/pac/dicotico-sequencial/dicotico-sequencial.form';
// import FechamentoAuditivoFiguraForm from 'components/forms/pac/fechamento-auditivo/fechamento-auditivo-figura.form';
// import FechamentoAuditivoFraseForm from 'components/forms/pac/fechamento-auditivo/fechamento-auditivo-frase.form';
// import LocalizacaoSonoraForm from 'components/forms/pac/localizacao-sonora/localizacao-sonora.form';
// import OrdenacaoTemporalForm from 'components/forms/pac/ordenacao-temporal/ordenacao-temporal.form';
// import ResolucaoTemporalForm from 'components/forms/pac/resolucao-temporal/resolucao-temporal-form';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import TesteSom from 'components/forms/pac/teste-som/teste-som.form';
import MainCard from 'components/MainCard';
import { useFormikContext } from 'formik';
import Layout from 'layout';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'store';

const resultFiguraFundo = [
    {
        id_dominio_valor: 11,
        id_dominio: 5,
        nm_dominio_valor: 'esperado',
        ds_dominio_valor: `A criança apresentou desempenho funcional esperado na habilidade de figura-fundo auditivo para a faixa etária avaliada. Conseguiu compreender os comandos apresentados mesmo na presença de ruído competitivo, selecionando adequadamente as figuras correspondentes.
						   	Interpretação pedagógica
						   	No momento, não há indicativo funcional relevante de dificuldade para acompanhar comandos orais em ambiente com ruído.`,
        dt_cadastro: '2026-05-11T21:52:55.378Z',
        dt_atualizacao: null,
        dt_exclusao: null,
        st_ativo: true
    },
    {
        id_dominio_valor: 12,
        id_dominio: 5,
        nm_dominio_valor: 'atencaoPedagogica',
        ds_dominio_valor: `A criança apresentou oscilação na habilidade de figura-fundo auditivo. Durante o rastreio, apresentou dificuldade pontual para identificar o comando verbal na presença de ruído competitivo.
							Interpretação pedagógica
							Pode apresentar instabilidade para acompanhar explicações quando há barulho, conversas paralelas ou múltiplos estímulos na sala.`,
        dt_cadastro: '2026-05-11T21:52:55.379Z',
        dt_atualizacao: null,
        dt_exclusao: null,
        st_ativo: true
    },
    {
        id_dominio_valor: 13,
        id_dominio: 5,
        nm_dominio_valor: 'riscoFuncional',
        ds_dominio_valor: `A criança apresentou dificuldade importante na habilidade de figura-fundo auditivo. Durante o rastreio, teve dificuldade para selecionar o estímulo verbal-alvo na presença de ruído competitivo.
							Interpretação pedagógica
							Esse resultado pode indicar dificuldade para compreender a fala do professor em ambiente ruidoso, impactando atenção, execução de comandos, participação em atividades coletivas e acompanhamento das explicações.`,
        dt_cadastro: '2026-05-11T21:52:55.381Z',
        dt_atualizacao: null,
        dt_exclusao: null,
        st_ativo: true
    }
];

const resultado = (figuraPath, figuraFundo) => {
    const theme = useTheme();

    return (
        <MainCard title={'Fechamento Auditivo Figura'} content={false}>
            <CardContent>
                <Typography variant="h5" color="textPrimary" gutterBottom>
                    Resultado
                </Typography>
                <Typography variant="body1">{resultFiguraFundo[0].ds_dominio_valor}</Typography>
            </CardContent>
        </MainCard>
    );
};
const TabResultadoForm = (props) => {
    const { title, anos } = props;

    const dispatch = useDispatch();

    const { values, handleBlur, handleChange, isSubmitting, setSubmitting, setFieldValue } = useFormikContext();

    // =========================
    // PATH DO FORM
    // =========================

    const figuraPath = 'pac[0].figura_fundo';

    const figuraFundo = useMemo(() => {
        return values?.pac?.[0]?.figura_fundo || {};
    }, [values]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <TesteSom />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {resultado(figuraPath, figuraFundo)}
                </Grid>
            </Grid>
        </>
    );
};

TabResultadoForm.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    state: PropTypes.string
};

TabResultadoForm.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default TabResultadoForm;

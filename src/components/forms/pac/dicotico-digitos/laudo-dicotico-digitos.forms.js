import { Box, CardMedia, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';
import Layout from 'layout';
import PropTypes from 'prop-types';

const ImagemLocalizacaoSonora = '/assets/images/pac/localizacao-sonora.jpeg';

const LaudoDicoticoDigitosForm = (props) => {
  const { initialValues } = props;

  const theme = useTheme();

  function resultadoLivre() {
    const l1 = contarValoresTrue4(initialValues.cs_f_1_1, initialValues.cs_f_1_2, initialValues.cs_f_1_3, initialValues.cs_f_1_4);
    const l2 = contarValoresTrue4(initialValues.cs_f_2_1, initialValues.cs_f_2_2, initialValues.cs_f_2_3, initialValues.cs_f_2_4);
    const l3 = contarValoresTrue4(initialValues.cs_f_3_1, initialValues.cs_f_3_2, initialValues.cs_f_3_3, initialValues.cs_f_3_4);
    const l4 = contarValoresTrue4(initialValues.cs_f_4_1, initialValues.cs_f_4_2, initialValues.cs_f_4_3, initialValues.cs_f_4_4);
    const l5 = contarValoresTrue4(initialValues.cs_f_5_1, initialValues.cs_f_5_2, initialValues.cs_f_5_3, initialValues.cs_f_5_4);

    return ((l1 + l2 + l3 + l4 + l5) / 5) * 100;
  }

  function resultadoDirigido() {
    const l1 = contarValoresTrue2(
      initialValues.cs_destro,
      initialValues.cs_canhoto,
      initialValues.cs_od_1_1,
      initialValues.cs_od_1_2,
      initialValues.cs_oe_1_1,
      initialValues.cs_oe_1_2
    );
    const l2 = contarValoresTrue2(
      initialValues.cs_destro,
      initialValues.cs_canhoto,
      initialValues.cs_od_2_1,
      initialValues.cs_od_2_2,
      initialValues.cs_oe_2_1,
      initialValues.cs_oe_2_2
    );
    const l3 = contarValoresTrue2(
      initialValues.cs_destro,
      initialValues.cs_canhoto,
      initialValues.cs_od_3_1,
      initialValues.cs_od_3_2,
      initialValues.cs_oe_3_1,
      initialValues.cs_oe_3_2
    );
    const l4 = contarValoresTrue2(
      initialValues.cs_destro,
      initialValues.cs_canhoto,
      initialValues.cs_od_4_1,
      initialValues.cs_od_4_2,
      initialValues.cs_oe_4_1,
      initialValues.cs_oe_4_2
    );
    const l5 = contarValoresTrue2(
      initialValues.cs_destro,
      initialValues.cs_canhoto,
      initialValues.cs_od_5_1,
      initialValues.cs_od_5_2,
      initialValues.cs_oe_5_1,
      initialValues.cs_oe_5_2
    );

    return ((l1 + l2 + l3 + l4 + l5) / 5) * 100;
  }

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
    return contagem == 4 ? 1 : 0;
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
    return total == 2 ? 1 : 0;
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          bgcolor: `${theme.palette.primary[700]}`,
          position: 'relative',
          p: 2.75,
          borderRadius: { xs: 2, sm: '8px 0px 0px 8px' },
          overflow: 'hidden'
        }}
      >
        <Stack>
          <Typography variant="h3" color="white">
            Dicótico Dígitos
          </Typography>
          <Typography color={theme.palette.grey[0]} variant="caption" sx={{ maxWidth: '100%', pt: 1 }}>
            Your learning capacity is 80% as daily analytics
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h4" color="white" sx={{ pt: 8, pb: 1, zIndex: 1 }}>
            Resultado Livre
          </Typography>
          <Box>
            <LinearWithLabel value={resultadoLivre()} color="success" sx={{ height: 10 }} />
          </Box>
        </Stack>
        <Stack>
          <Typography variant="h4" color="white" sx={{ pt: 1, pb: 1, zIndex: 1 }}>
            Resultado Dirigido
          </Typography>
          <Box>
            <LinearWithLabel value={resultadoDirigido()} color="success" sx={{ height: 10 }} />
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <CardMedia component="img" src={ImagemLocalizacaoSonora} alt="Localização Sonora" sx={{ width: '100%', maxHeight: 300 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard sx={{ borderRadius: { xs: 2, sm: '0px 8px 8px 0px' }, height: '100%', mt: { xs: 2.5, sm: 0 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack>
                <Typography variant="h4">Metodologia Utilizada</Typography>
                <Typography color="textSecondary" sx={{ pt: 1 }}></Typography>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

LaudoDicoticoDigitosForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

LaudoDicoticoDigitosForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default LaudoDicoticoDigitosForm;

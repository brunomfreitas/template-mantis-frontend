import { Box, CardMedia, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';
import Layout from 'layout';
import PropTypes from 'prop-types';

const ImagemLocalizacaoSonora = '/assets/images/pac/localizacao-sonora.jpeg';

const LaudoOrdenacaoTemporalForm = (props) => {
  const { initialValues } = props;

  const theme = useTheme();

  function contarNomeando() {
    const l1 = initialValues.cs_n_1 === true && initialValues.cs_r_n_1 === true ? 1 : 0;
    const l2 = initialValues.cs_n_2 === true && initialValues.cs_r_n_2 === true ? 1 : 0;
    const l3 = initialValues.cs_n_3 === true && initialValues.cs_r_n_3 === true ? 1 : 0;
    const l4 = initialValues.cs_n_4 === true && initialValues.cs_r_n_4 === true ? 1 : 0;
    const l5 = initialValues.cs_n_5 === true && initialValues.cs_r_n_5 === true ? 1 : 0;
    const l6 = initialValues.cs_n_6 === true && initialValues.cs_r_n_6 === true ? 1 : 0;
    return (((l1 + l2 + l3 + l4 + l5 + l6) / 6) * 100).toFixed(2);
  }

  function contarImitando() {
    const l1 = initialValues.cs_i_1 === true && initialValues.cs_r_i_1 === true ? 1 : 0;
    const l2 = initialValues.cs_i_2 === true && initialValues.cs_r_i_2 === true ? 1 : 0;
    const l3 = initialValues.cs_i_3 === true && initialValues.cs_r_i_3 === true ? 1 : 0;
    const l4 = initialValues.cs_i_4 === true && initialValues.cs_r_i_4 === true ? 1 : 0;
    const l5 = initialValues.cs_i_5 === true && initialValues.cs_r_i_5 === true ? 1 : 0;
    const l6 = initialValues.cs_i_6 === true && initialValues.cs_r_i_6 === true ? 1 : 0;
    return (((l1 + l2 + l3 + l4 + l5 + l6) / 6) * 100).toFixed(2);
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
            Ordenação Temporal
          </Typography>
          <Typography color={theme.palette.grey[0]} variant="caption" sx={{ maxWidth: '100%', pt: 1 }}>
            Your learning capacity is 80% as daily analytics
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h4" color="white" sx={{ pt: 8, pb: 1, zIndex: 1 }}>
            Resultado Nomeando
          </Typography>
          <Box>
            <LinearWithLabel value={contarNomeando()} color="success" sx={{ height: 10 }} />
          </Box>
        </Stack>
        <Stack>
          <Typography variant="h4" color="white" sx={{ pt: 1, pb: 1, zIndex: 1 }}>
            Resultado Imitando
          </Typography>
          <Box>
            <LinearWithLabel value={contarImitando()} color="success" sx={{ height: 10 }} />
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
        <CardMedia component="img" src={ImagemLocalizacaoSonora} alt="Localização Sonora" sx={{ width: '100%', height: 300 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard sx={{ borderRadius: { xs: 2, sm: '0px 8px 8px 0px' }, height: '100%', mt: { xs: 2.5, sm: 0 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack>
                <Typography variant="h4">Metodologia Utilizada</Typography>
                <Typography color="textSecondary" sx={{ pt: 1 }}>
                  {' '}
                  Texto da Metodologia Utilizada
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

LaudoOrdenacaoTemporalForm.propTypes = {
  initialValues: PropTypes.object,
  title: PropTypes.string,
  state: PropTypes.string
};

LaudoOrdenacaoTemporalForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default LaudoOrdenacaoTemporalForm;

import { Box, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const ImagemLocalizacaoSonora = '/assets/images/pac/localizacao-sonora.jpeg';

const LaudoLocalizacaoSonoraForm = (props) => {
  const { initialValues } = props;

  const theme = useTheme();

  function contarValoresTrue(objeto) {
    let contagem = 0;
    for (let chave in objeto) {
      if (chave !== 'cs_recusa' && objeto[chave] === true) {
        contagem++;
      }
    }

    return (contagem / 5) * 100;
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
            Localização Sonora
          </Typography>
          <Typography color={theme.palette.grey[0]} variant="caption" sx={{ maxWidth: '100%', pt: 1 }}>
            Your learning capacity is 80% as daily analytics
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h4" color="white" sx={{ pt: 8, pb: 1, zIndex: 1 }}>
            Resultado
          </Typography>

          <Box>
            <LinearWithLabel value={contarValoresTrue(initialValues)} color="success" sx={{ height: 10 }} />
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
        <CardMedia component="img" src={ImagemLocalizacaoSonora} alt="Localização Sonora" sx={{ width: '100%', maxHeight: 240 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard sx={{ borderRadius: { xs: 2, sm: '0px 8px 8px 0px' }, height: '100%', mt: { xs: 2.5, sm: 0 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack>
                <Typography variant="h4">Metodologia Utilizada</Typography>
                <Typography color="textSecondary" sx={{ pt: 1 }}>
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

LaudoLocalizacaoSonoraForm.propTypes = {
  initialValues: PropTypes.object
};

export default LaudoLocalizacaoSonoraForm;

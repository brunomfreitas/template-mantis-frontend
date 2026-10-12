import { Box, CardMedia, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';

const ImagemLocalizacaoSonora = '/assets/images/pac/localizacao-sonora.jpeg';

const LaudoResolucaoTemporalForm = (props) => {
  const { initialValues } = props;

  const theme = useTheme();

  const resultado = (objeto) => {
    if (!objeto) {
      return '';
    }

    // Filtrar as chaves do objeto que começam com "cs_" e têm o valor igual a true
    const camposCsTrue = Object.keys(objeto)
      .filter((chave) => chave.startsWith('cs_') && chave !== 'cs_0' && objeto[chave] === true)
      .map((chave) => parseInt(chave.replace('cs_', ''), 10)); // Converter para números inteiros

    // Encontrar o menor valor entre os campos encontrados
    const menorCsTrue = camposCsTrue.length > 0 ? Math.min(...camposCsTrue) : null;

    return menorCsTrue !== null ? menorCsTrue : '';
  };

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
            Resolução Temporal
          </Typography>
          <Typography color={theme.palette.grey[0]} variant="caption" sx={{ maxWidth: '100%', pt: 1 }}>
            Your learning capacity is 80% as daily analytics
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h4" color="white" sx={{ pt: 8, pb: 1, zIndex: 1 }}>
            Menor Gap
          </Typography>

          <Box>
            <Typography color="white">{resultado(initialValues)}</Typography>
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
        <CardMedia component="img" src={ImagemLocalizacaoSonora} alt="Localização Sonora" sx={{ width: '100%', maxHeight: 245 }} />
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

LaudoResolucaoTemporalForm.propTypes = {
  initialValues: PropTypes.object
};

export default LaudoResolucaoTemporalForm;

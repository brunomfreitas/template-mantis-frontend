import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';

const style = {
  py: 0,
  width: '100%',
  maxWidth: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper'
};

const DialogLocalizacaoSonoraTeste = (props) => {
  const { open, setOpen } = props;

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(!open);
      }}
    >
      <DialogTitle>
        <Typography variant="h2" gutterBottom>
          Teste de Localização Sonora
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Sinalize qual o lado que escutou o som.
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Você ouvirá vários sons em diferentes posições, descubra de qual lado vem o som !
        </Typography>
      </DialogTitle>
      <DialogContent>
        <List sx={style}>
          <ListItem>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AudioPlayerCircle
                  src="/assets/audios/pac/localizacao-sonora/teste-refri.mp3"
                  variant="contained"
                  color="error"
                  label="OD"
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Em qual lado voçê ouviu o refrigerante ?
                </Typography>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <RadioGroup row name="radio-buttons-group-mosquito">
                    <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                    <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                    <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AudioPlayerCircle
                  src="/assets/audios/pac/localizacao-sonora/teste-fosforo.mp3"
                  variant="contained"
                  color="error"
                  label="OD"
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Em qual lado o fosforo acendeu ?
                </Typography>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <RadioGroup row name="radio-buttons-group-cs_tesoura">
                    <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                    <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                    <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </ListItem>

          <Divider variant="middle" component="li" />
          <ListItem>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AudioPlayerCircle
                  src="/assets/audios/pac/localizacao-sonora/teste-aparelho-eletrico.mp3"
                  variant="contained"
                  color="error"
                  label="OD"
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  Em qual lado o aparelho elétrico ligou ?
                </Typography>
              </Grid>
              <Grid item>
                <FormControl>
                  <RadioGroup name="radio-buttons-group-cs_porta" row>
                    <FormControlLabel value="OE" control={<Radio />} label="Esquerdo" labelPlacement="top" />
                    <FormControlLabel value="OD" control={<Radio />} label="Direito" labelPlacement="top" />
                    <FormControlLabel value="ED" control={<Radio />} label="Os Dois" labelPlacement="top" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogLocalizacaoSonoraTeste.propTypes = {
  //   initialValues: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default DialogLocalizacaoSonoraTeste;

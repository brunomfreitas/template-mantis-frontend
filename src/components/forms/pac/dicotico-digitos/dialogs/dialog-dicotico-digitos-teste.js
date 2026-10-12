import { Button, Fab, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Layout from 'layout';
import AudioPlayerCircle from 'pages/audio/audio-player-circle';
import PropTypes from 'prop-types';

const DialogDicoticoDigitosTeste = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { open, setOpen, initialValues } = props;

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={() => {
        setOpen(!open);
      }}
    >
      <DialogTitle>Teste de Dicótico de Dígitos</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você ouvirá 4 números, sendo que 2 deles serão falados no ouvido direito e 2 deles no ouvido esquerdo, ao mesmo tempo !
        </DialogContentText>
        <DialogContentText>Ouça os números e repita em voz alta:</DialogContentText>
      </DialogContent>
      <DialogContent>
        <Box sx={{ width: '100%', height: '100%' }}>
          <List>
            <ListItem>
              <Grid container spacing={2} row>
                <Grid item xs={2} sm={2} md={2}>
                  <Typography variant="subtitle1" textAlign="center">
                    Play
                  </Typography>
                </Grid>

                <Grid item xs={5} sm={5} md={5}>
                  <Typography variant="subtitle1" textAlign="center">
                    OE
                  </Typography>
                </Grid>

                <Grid item xs={5} sm={5} md={5}>
                  <Typography variant="subtitle1" textAlign="center">
                    OD
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={2} row>
                <Grid item xs={2} sm={2} md={2}>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <AudioPlayerCircle src="/assets/audios/pac/dicotico-digitos/teste-1.mp3" variant="contained" color="error" />
                  </Stack>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                    <Fab variant="contained" color="error" size="small">
                      4
                    </Fab>
                    <Fab variant="contained" color="error" size="small">
                      5
                    </Fab>
                  </Stack>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                    <Fab variant="contained" color="primary" size="small">
                      7
                    </Fab>
                    <Fab variant="contained" color="primary" size="small">
                      8
                    </Fab>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={2} row>
                <Grid item xs={2} sm={2} md={2}>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <AudioPlayerCircle src="/assets/audios/pac/dicotico-digitos/teste-2.mp3" variant="contained" color="error" />
                  </Stack>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                    <Fab variant="contained" color="error" size="small">
                      4
                    </Fab>
                    <Fab variant="contained" color="error" size="small">
                      7
                    </Fab>
                  </Stack>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-around">
                    <Fab variant="contained" color="primary" size="small">
                      8
                    </Fab>
                    <Fab variant="contained" color="primary" size="small">
                      9
                    </Fab>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>
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

DialogDicoticoDigitosTeste.propTypes = {
  initialValues: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

DialogDicoticoDigitosTeste.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DialogDicoticoDigitosTeste;

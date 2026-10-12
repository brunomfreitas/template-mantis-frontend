import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { DeleteFilled } from '@ant-design/icons';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function DialogExcluirLista({ title, open, setOpen, remover, data }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Deseja excluir o registro ?
            </Typography>
            {title ? (
              <Typography align="center">
                Excluindo a/o
                <Typography variant="subtitle1" component="span">
                  {' '}
                  &quot;{title}&quot;{' '}
                </Typography>
                todos os seus componentes vinculados serão excluidos.
              </Typography>
            ) : (
              <Typography align="center">Excluindo o registro, todos os seus componentes vinculados serão excluidos.</Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => setOpen(false)} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={() => remover(data)} autoFocus>
              Excluir
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

DialogExcluirLista.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  remover: PropTypes.func,
  data: PropTypes.object
};

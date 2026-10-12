import { grupoUsuarioSlice } from '../reducers/grupo-usuario';
import { createEntityActions } from './genericActions';

export const grupoUsuarioaActions = createEntityActions(grupoUsuarioSlice, 'grupo-usuario');

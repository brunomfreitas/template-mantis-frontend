import { createEntityActions } from '../actions/genericActions';
import { usuarioSlice } from '../reducers/usuario';

export const usuarioActions = createEntityActions(usuarioSlice, 'usuario');

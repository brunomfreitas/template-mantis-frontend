import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const usuarioSlice = createEntitySlice('usuario');

// Cria as actions (como fetch, create, update etc.)
export const usuarioActions = createEntityActions(usuarioSlice, 'usuario');

// Exporta o reducer
export const usuarioReducer = usuarioSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = usuarioActions;

export default usuarioReducer;

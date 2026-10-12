import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const grupoUsuarioSlice = createEntitySlice('grupo-usuario');

// Cria as actions (como fetch, create, update etc.)
export const grupoUsuarioActions = createEntityActions(grupoUsuarioSlice, 'grupo-usuario');

// Exporta o reducer
export const grupoUsuarioReducer = grupoUsuarioSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = grupoUsuarioActions;

export default grupoUsuarioReducer;

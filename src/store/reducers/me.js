import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const meSlice = createEntitySlice('empresa');

// Cria as actions (como fetch, create, update etc.)
export const meActions = createEntityActions(meSlice, 'empresa');

// Exporta o reducer
export const meReducer = meSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = meActions;

export default meReducer;

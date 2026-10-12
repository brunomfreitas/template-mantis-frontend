import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
export const pacSlice = createEntitySlice('pac');

// Cria as actions (como fetch, create, update etc.)
export const pacActions = createEntityActions(pacSlice, 'pac');

// Exporta o reducer
export const pacReducer = pacSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = pacActions;

export default pacReducer;

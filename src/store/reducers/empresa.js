import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const empresaSlice = createEntitySlice('empresa');

// Cria as actions (como fetch, create, update etc.)
export const empresaActions = createEntityActions(empresaSlice, 'empresa');

// Exporta o reducer
export const empresaReducer = empresaSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = empresaActions;

export default empresaReducer;

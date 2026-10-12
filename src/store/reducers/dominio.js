import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
export const dominioSlice = createEntitySlice('dominio');

// Cria as actions (como fetch, create, update etc.)
export const dominioActions = createEntityActions(dominioSlice, 'dominio');

// Exporta o reducer
export const dominioReducer = dominioSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = dominioActions;

export default dominioReducer;

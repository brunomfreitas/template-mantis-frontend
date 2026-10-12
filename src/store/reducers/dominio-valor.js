import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
export const dominioValorSlice = createEntitySlice('dominio-valor');

// Cria as actions (como fetch, create, update etc.)
export const dominioValorActions = createEntityActions(dominioValorSlice, 'dominio-valor');

// Exporta o reducer
export const dominioValorReducer = dominioValorSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = dominioValorActions;

export default dominioValorReducer;

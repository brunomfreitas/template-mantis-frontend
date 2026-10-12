import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const organizacaoSlice = createEntitySlice('organizacao');

// Cria as actions (como fetch, create, update etc.)
export const organizacaoActions = createEntityActions(organizacaoSlice, 'organizacao');

// Exporta o reducer
export const organizacaoReducer = organizacaoSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = organizacaoActions;

export default organizacaoReducer;

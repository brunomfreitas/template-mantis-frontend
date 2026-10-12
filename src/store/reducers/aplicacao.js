import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const aplicacaoSlice = createEntitySlice('aplicacao');

// Cria as actions (como fetch, create, update etc.)
export const aplicacaoActions = createEntityActions(aplicacaoSlice, 'aplicacao');

// Exporta o reducer
export const aplicacaoReducer = aplicacaoSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = aplicacaoActions;

export default aplicacaoReducer;

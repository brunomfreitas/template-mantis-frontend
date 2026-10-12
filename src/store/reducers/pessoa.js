import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const pessoaSlice = createEntitySlice('pessoa');

// Cria as actions (como fetch, create, update etc.)
export const pessoaActions = createEntityActions(pessoaSlice, 'pessoa');

// Exporta o reducer
export const pessoaReducer = pessoaSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = pessoaActions;

export default pessoaReducer;

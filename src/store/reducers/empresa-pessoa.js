import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const empresaPessoaSlice = createEntitySlice('empresa-pessoa');

// Cria as actions (como fetch, create, update etc.)
export const empresaPessoaActions = createEntityActions(empresaPessoaSlice, 'empresa-pessoa');

// Exporta o reducer
export const empresaPessoaReducer = empresaPessoaSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = empresaPessoaActions;

export default empresaPessoaReducer;

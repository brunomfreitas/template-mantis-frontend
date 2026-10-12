import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const grupoAplicacaoSlice = createEntitySlice('grupo-aplicacao');

// Cria as actions (como fetch, create, update etc.)
export const grupoAplicacaoActions = createEntityActions(grupoAplicacaoSlice, 'grupo-aplicacao');

// Exporta o reducer
export const grupoAplicacaoReducer = grupoAplicacaoSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = grupoAplicacaoActions;

export default grupoAplicacaoReducer;

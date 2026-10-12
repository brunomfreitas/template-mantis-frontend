import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const grupoAplicacaoRestricaoSlice = createEntitySlice('grupo-aplicacao-restricao');

// Cria as actions (como fetch, create, update etc.)
export const grupoAplicacaoRestricaoActions = createEntityActions(grupoAplicacaoRestricaoSlice, 'grupo-aplicacao-restricao');

// Exporta o reducer
export const grupoAplicacaoRestricaoReducer = grupoAplicacaoRestricaoSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = grupoAplicacaoRestricaoActions;

export default grupoAplicacaoRestricaoReducer;

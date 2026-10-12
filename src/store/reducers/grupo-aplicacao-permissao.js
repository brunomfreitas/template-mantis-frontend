import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const grupoAplicacaoPermissaoSlice = createEntitySlice('grupo-aplicacao-permissao');

// Cria as actions (como fetch, create, update etc.)
export const grupoAplicacaoPermissaoActions = createEntityActions(grupoAplicacaoPermissaoSlice, 'grupo-aplicacao-permissao');

// Exporta o reducer
export const grupoAplicacaoPermissaoReducer = grupoAplicacaoPermissaoSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = grupoAplicacaoPermissaoActions;

export default grupoAplicacaoPermissaoReducer;

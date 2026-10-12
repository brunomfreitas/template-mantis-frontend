import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const grupoSegurancaSlice = createEntitySlice('grupo-seguranca');

// Cria as actions (como fetch, create, update etc.)
export const grupoSegurancaActions = createEntityActions(grupoSegurancaSlice, 'grupo-seguranca');

// Exporta o reducer
export const grupoSegurancaReducer = grupoSegurancaSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = grupoSegurancaActions;

export default grupoSegurancaReducer;

import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const grupoSiteSlice = createEntitySlice('grupo-site');

// Cria as actions (como fetch, create, update etc.)
export const grupoSiteActions = createEntityActions(grupoSiteSlice, 'grupo-site');

// Exporta o reducer
export const grupoSiteReducer = grupoSiteSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = grupoSiteActions;

export default grupoSiteReducer;

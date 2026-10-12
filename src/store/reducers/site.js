import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const siteSlice = createEntitySlice('site');

// Cria as actions (como fetch, create, update etc.)
export const siteActions = createEntityActions(siteSlice, 'site');

// Exporta o reducer
export const siteReducer = siteSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete } = siteActions;

export default siteReducer;

//paginacao

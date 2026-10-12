import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const companySlice = createEntitySlice('company');

// Cria as actions (como fetch, create, update etc.)
export const companyActions = createEntityActions(companySlice, 'company');

// Exporta o reducer
export const companyReducer = companySlice.reducer;

// Exporta as actions individuais
export const { search, fetch, fetchById, create, update, softDelete, destroy } = companyActions;

export default companyReducer;

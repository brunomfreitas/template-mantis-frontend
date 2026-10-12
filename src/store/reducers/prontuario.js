import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
export const prontuarioSlice = createEntitySlice('prontuario');

// Cria as actions (como fetch, create, update etc.)
export const prontuarioActions = createEntityActions(prontuarioSlice, 'prontuario');

// Exporta o reducer
export const prontuarioReducer = prontuarioSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = prontuarioActions;

export default prontuarioReducer;

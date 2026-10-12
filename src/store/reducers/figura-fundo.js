import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
export const figuraFundoSlice = createEntitySlice('figura-fundo');

// Cria as actions (como fetch, create, update etc.)
export const figuraFundoActions = createEntityActions(figuraFundoSlice, 'figura-fundo');

// Exporta o reducer
export const figuraFundoReducer = figuraFundoSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = figuraFundoActions;

export default figuraFundoReducer;

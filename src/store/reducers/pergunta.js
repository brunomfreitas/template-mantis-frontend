import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
const perguntaSlice = createEntitySlice('pergunta');

// Cria as actions (como fetch, create, update etc.)
export const perguntaActions = createEntityActions(perguntaSlice, 'pergunta');

// Exporta o reducer
export const perguntaReducer = perguntaSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = perguntaActions;

export default perguntaReducer;

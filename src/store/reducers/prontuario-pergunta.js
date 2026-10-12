import { createEntityActions } from '../actions/genericActions';
import { createEntitySlice } from './baseSlice';

// Cria o slice
export const prontuarioPerguntaSlice = createEntitySlice('prontuario-pergunta');

// Cria as actions (como fetch, create, update etc.)
export const prontuarioPerguntaActions = createEntityActions(prontuarioPerguntaSlice, 'prontuario-pergunta');

// Exporta o reducer
export const prontuarioPerguntaReducer = prontuarioPerguntaSlice.reducer;

// Exporta as actions individuais (isso resolve o erro no seu componente)
export const { search, fetch, fetchById, create, update, softDelete, destroy } = prontuarioPerguntaActions;

export default prontuarioPerguntaReducer;

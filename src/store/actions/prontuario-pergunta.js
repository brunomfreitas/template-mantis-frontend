import { prontuarioPerguntaSlice } from 'store/reducers/prontuario-pergunta';
import { createEntityActions } from './genericActions';

export const prontuarioPerguntaActions = createEntityActions(prontuarioPerguntaSlice, 'prontuario_pergunta');

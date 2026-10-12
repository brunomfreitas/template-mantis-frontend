import { perguntaSlice } from '../reducers/pergunta';
import { createEntityActions } from './genericActions';

export const perguntaActions = createEntityActions(perguntaSlice, 'pergunta');

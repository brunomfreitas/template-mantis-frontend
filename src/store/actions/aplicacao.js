import { createEntityActions } from '../actions/genericActions';
import { aplicacaoSlice } from '../reducers/aplicacao';

export const aplicacaoActions = createEntityActions(aplicacaoSlice, 'aplicacao');

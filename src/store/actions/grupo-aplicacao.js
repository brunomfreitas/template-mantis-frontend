import { grupoAplicacaoSlice } from '../reducers/grupo-aplicacao';
import { createEntityActions } from './genericActions';

export const grupoAplicacaoActions = createEntityActions(grupoAplicacaoSlice, 'grupo-aplicacao');

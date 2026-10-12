import { grupoAplicacaoRestricaoSlice } from '../reducers/grupo-aplicacao-restricao';
import { createEntityActions } from './genericActions';

export const grupoAplicacaoRestricaoActions = createEntityActions(grupoAplicacaoRestricaoSlice, 'grupo-aplicacao-restricao');

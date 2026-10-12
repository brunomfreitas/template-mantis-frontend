import { grupoAplicacaoPermissaoSlice } from '../reducers/grupo-aplicacao-permissao';
import { createEntityActions } from './genericActions';

export const grupoAplicacaoPermissaoActions = createEntityActions(grupoAplicacaoPermissaoSlice, 'grupo-aplicacao-permissao');

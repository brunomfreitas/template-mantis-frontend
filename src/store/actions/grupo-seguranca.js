import { createEntityActions } from '../actions/genericActions';
import { grupoSegurancaSlice } from '../reducers/grupo-seguranca';

export const grupoSegurancaActions = createEntityActions(grupoSegurancaSlice, 'grupo-seguranca');

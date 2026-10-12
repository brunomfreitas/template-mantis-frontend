import { createEntityActions } from '../actions/genericActions';
import { empresaSlice } from '../reducers/empresa';

export const empresaActions = createEntityActions(empresaSlice, 'empresa');

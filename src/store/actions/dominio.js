import { createEntityActions } from '../actions/genericActions';
import { dominioSlice } from '../reducers/dominio';

export const dominioActions = createEntityActions(dominioSlice, 'dominio');

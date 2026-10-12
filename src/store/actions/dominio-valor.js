import { dominioValorSlice } from '../reducers/dominio-valor';
import { createEntityActions } from './genericActions';

export const dominioValorActions = createEntityActions(dominioValorSlice, 'dominio-valor');

import { createEntityActions } from '../actions/genericActions';
import { organizacaoSlice } from '../reducers/organizacao';

export const organizacaoActions = createEntityActions(organizacaoSlice, 'organizacao');

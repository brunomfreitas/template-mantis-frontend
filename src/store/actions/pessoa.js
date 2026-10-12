import { pessoaSlice } from 'store/reducers/pessoa';
import { createEntityActions } from './genericActions';

export const pessoaActions = createEntityActions(pessoaSlice, 'pessoa');

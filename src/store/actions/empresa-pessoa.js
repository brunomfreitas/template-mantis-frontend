import { empresaPessoaSlice } from '../reducers/empresa-pessoa';
import { createEntityActions } from './genericActions';

export const empresaPessoaActions = createEntityActions(empresaPessoaSlice, 'empresa-pessoa');

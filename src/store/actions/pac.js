import { pacSlice } from 'store/reducers/pac';
import { createEntityActions } from './genericActions';

export const pacActions = createEntityActions(pacSlice, 'pac');

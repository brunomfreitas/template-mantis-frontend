import { meSlice } from '../reducers/me';
import { createEntityActions } from './genericActions';

export const meActions = createEntityActions(meSlice, 'empresa');

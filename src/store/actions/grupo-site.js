import { createEntityActions } from '../actions/genericActions';
import { grupoSiteSlice } from '../reducers/grupo-site';

export const grupoSiteActions = createEntityActions(grupoSiteSlice, 'grupo-site');

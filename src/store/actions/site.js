// src/store/actions/site.js
import { siteSlice } from '../reducers/site';
import { createEntityActions } from './genericActions';

export const siteActions = createEntityActions(siteSlice, 'site');

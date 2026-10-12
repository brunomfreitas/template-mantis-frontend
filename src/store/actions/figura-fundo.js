import { figuraFundoSlice } from 'store/reducers/figura-fundo';
import { createEntityActions } from './genericActions';

export const figuraFundoActions = createEntityActions(figuraFundoSlice, 'figura-fundo');

// src/store/actions/genericActions.js
import { dispatch } from 'store';
import axios from 'utils/api';

export const createEntityActions = (slice, endpoint) => {
    const actions = slice.actions;

    return {
        // fecth com paginação
        fetch: (params) => async () => {
            dispatch(actions.loading());
            try {
                const { filter = '', page = 1, pageSize = 10, orderBy, orderDir = 'asc' } = params || {};

                const response = await axios.get(`/${endpoint}`, {
                    params: {
                        filter,
                        page,
                        pageSize: pageSize === 'all' ? undefined : pageSize,
                        orderBy,
                        orderDir
                    }
                });

                console.log('fetch response', response);
                dispatch(actions.setList(response.data));
            } catch (error) {
                dispatch(actions.hasError(error));
            }
        },

        search: (params) => async () => {
            dispatch(actions.loading());

            try {
                const { expr, filter = '', page = 1, pageSize = 10, orderBy, orderDir = 'asc' } = params || {};

                console.log('expr', expr);
                console.log('filter', filter);
                console.log('page', page);
                console.log('pageSize', pageSize);
                console.log('orderBy', orderBy);
                console.log('orderDir', orderDir);

                const response = await axios.get(`/${endpoint}/search`, {
                    params: {
                        expr,
                        filter, //🔹 agora o filtro do ReactTable vai pro backend
                        page,
                        pageSize,
                        orderBy,
                        orderDir
                    }
                });

                dispatch(actions.setSearch(response.data));
            } catch (error) {
                dispatch(actions.hasError(error));
            }
        },

        fetchById: (id) => async () => {
            dispatch(actions.loading());
            try {
                const response = await axios.get(`/${endpoint}/editar/${id}`);
                dispatch(actions.setById(response.data));
            } catch (error) {
                dispatch(actions.hasError(error));
            }
        },

        create: (data) => async () => {
            dispatch(actions.loading());
            try {
                const response = await axios.post(`/${endpoint}`, data);
                dispatch(actions.create(response.data));
                return response.data; // <-- ESSENCIAL para capturar no componente
            } catch (error) {
                console.log('genericActions error', error);
                dispatch(actions.hasError(error));
                throw error; // <-- também importante para capturar erros
            }
        },

        update: (id, data) => async () => {
            dispatch(actions.loading());
            try {
                const response = await axios.put(`/${endpoint}/editar/${id}`, data);
                dispatch(actions.update(response.data));
                return response.data; // <-- ESSENCIAL para capturar no componente
            } catch (error) {
                dispatch(actions.hasError(error));
                throw error; // <-- também importante para capturar erros
            }
        },

        softDelete: (id) => async () => {
            dispatch(actions.loading());
            try {
                const response = await axios.put(`/${endpoint}/${id}`);
                dispatch(actions.softDelete(response.data));
            } catch (error) {
                dispatch(actions.hasError(error));
            }
        },

        destroy: (id) => async () => {
            dispatch(actions.loading());
            try {
                await axios.delete(`/${endpoint}/${id}`);
            } catch (error) {
                dispatch(actions.hasError(error));
            }
        }
    };
};

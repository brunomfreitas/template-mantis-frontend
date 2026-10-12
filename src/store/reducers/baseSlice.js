// src/store/reducers/baseSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const createEntitySlice = (name) => {
    return createSlice({
        name,
        initialState: {
            list: [], // lista de todos os registros
            item: null, // item selecionado por ID
            isLoader: false,
            error: null,
            isModalOpen: false,
            selectedId: null,
            // 🔹 metadados de paginação
            page: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0
        },
        reducers: {
            loading: (state) => {
                state.isLoader = true;
            },
            hasError: (state, action) => {
                state.isLoader = false;
                state.error = action.payload;
            },
            setList: (state, action) => {
                state.list = action.payload.data;
                state.page = action.payload.page;
                state.pageSize = action.payload.pageSize;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.isLoader = false;
            },
            setAll: (state, action) => {
                state.isLoader = false;
                state.list = action.payload;
            },
            setSearch: (state, action) => {
                state.list = action.payload.data;
                state.page = action.payload.page;
                state.pageSize = action.payload.pageSize;
                state.total = action.payload.total;
                state.totalPages = action.payload.totalPages;
                state.isLoader = false;
            },
            setById: (state, action) => {
                state.isLoader = false;
                state.item = action.payload;
            },
            create: (state, action) => {
                state.isLoader = false;
                state.isModalOpen = false;
                state.item = action.payload;
            },

            update: (state, action) => {
                state.isLoader = false;
                state.isModalOpen = false;
                state.item = action.payload;
            },
            softDelete: (state, action) => {
                state.isLoader = false;
                state.item = action.payload;
            },
            delete: (state) => {
                state.isLoader = false;
            },

            toggleModal: (state) => {
                state.isModalOpen = !state.isModalOpen;
                if (!state.isModalOpen) {
                    state.selectedId = null;
                }
            }
        }
    });
};

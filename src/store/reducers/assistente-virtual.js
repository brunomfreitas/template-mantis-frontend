import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
    error: false,
    data: [],
    isLoader: false,
    isModalOpen: false,
    selectedId: null
};

// ==============================|| CALENDAR - SLICE ||============================== //

const assistente_virtual = createSlice({
    name: 'assistente_virtual',
    initialState,
    reducers: {
        // loader
        loading(state) {
            state.isLoader = true;
        },

        // error
        hasError(state, action) {
            state.isLoader = false;
            state.error = action.payload;
        },

        // event list
        setAll(state, action) {
            state.isLoader = false;
            state.data = action.payload;
        },

        // event list
        setId(state, action) {
            state.isLoader = false;
            state.data = action.payload;
        },

        // select event
        selectId(state, action) {
            const eventId = action.payload;
            state.isModalOpen = true;
            state.selectedId = eventId;
        },

        // create event
        novo(state, action) {
            state.isLoader = false;
            state.isModalOpen = false;
            state.data = action.payload;
        },

        // update event
        editar(state, action) {
            state.isLoader = false;
            state.isModalOpen = false;
            state.selectedId = null;
            state.data = action.payload;
        },

        // delete event
        excluir(state, action) {
            state.isLoader = false;
            state.data = action.payload;
        },

        // modal toggle
        toggleModal(state) {
            state.isModalOpen = !state.isModalOpen;
            if (state.isModalOpen === false) {
                state.selectedId = null;
                state.selectedRange = null;
            }
        }
    }
});

export default assistente_virtual.reducer;

export const { data, isLoader } = assistente_virtual.actions;

export function ask(newEvent) {
    return async () => {
        dispatch(assistente_virtual.actions.loading());
        try {
            const response = await axios.post('/api/prompt', { text: newEvent });
            dispatch(assistente_virtual.actions.ask(response.data));
        } catch (error) {
            dispatch(assistente_virtual.actions.hasError(error));
        }
    };
}

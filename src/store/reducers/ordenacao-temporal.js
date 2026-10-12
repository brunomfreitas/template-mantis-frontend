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

const ordenacaoTemporal = createSlice({
  name: 'ordenacaoTemporal',
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

export default ordenacaoTemporal.reducer;

export const { data, isLoader } = ordenacaoTemporal.actions;

export function getAll() {
  return async () => {
    dispatch(ordenacaoTemporal.actions.loading());
    try {
      const response = await axios.get('/ordenacao_temporal');
      console.log(response.data);
      dispatch(
        ordenacaoTemporal.actions.setAll(
          response.data.map(
            ({
              id_ordenacao_temporal,
              ds_ordenacao_temporal,
              cs_recusa,
              cs_n_1,
              cs_n_2,
              cs_n_3,
              cs_n_4,
              cs_n_5,
              cs_n_6,
              cs_i_1,
              cs_i_2,
              cs_i_3,
              cs_i_4,
              cs_i_5,
              cs_i_6,
              cs_r_n_1,
              cs_r_n_2,
              cs_r_n_3,
              cs_r_n_4,
              cs_r_n_5,
              cs_r_n_6,
              cs_r_i_1,
              cs_r_i_2,
              cs_r_i_3,
              cs_r_i_4,
              cs_r_i_5,
              cs_r_i_6
            }) => ({
              ID: id_ordenacao_temporal,
              ds_ordenacao_temporal: ds_ordenacao_temporal,
              cs_recusa: cs_recusa,
              cs_n_1: cs_n_1,
              cs_n_2: cs_n_2,
              cs_n_3: cs_n_3,
              cs_n_4: cs_n_4,
              cs_n_5: cs_n_5,
              cs_n_6: cs_n_6,
              cs_i_1: cs_i_1,
              cs_i_2: cs_i_2,
              cs_i_3: cs_i_3,
              cs_i_4: cs_i_4,
              cs_i_5: cs_i_5,
              cs_i_6: cs_i_6,
              cs_r_n_1: cs_r_n_1,
              cs_r_n_2: cs_r_n_2,
              cs_r_n_3: cs_r_n_3,
              cs_r_n_4: cs_r_n_4,
              cs_r_n_5: cs_r_n_5,
              cs_r_n_6: cs_r_n_6,
              cs_r_i_1: cs_r_i_1,
              cs_r_i_2: cs_r_i_2,
              cs_r_i_3: cs_r_i_3,
              cs_r_i_4: cs_r_i_4,
              cs_r_i_5: cs_r_i_5,
              cs_r_i_6: cs_r_i_6
            })
          )
        )
      );
    } catch (error) {
      dispatch(ordenacaoTemporal.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(ordenacaoTemporal.actions.loading());
    try {
      const response = await axios.get('/ordenacao_temporal/editar/' + id);
      dispatch(ordenacaoTemporal.actions.setId(response.data));
      console.log('sucesso: getId ordenacaoTemporal');
    } catch (error) {
      dispatch(ordenacaoTemporal.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(ordenacaoTemporal.actions.loading());
    try {
      const response = await axios.put('/ordenacao_temporal/editar/' + id, event);
      dispatch(ordenacaoTemporal.actions.editar(response.data));
      console.log('sucesso: update ordenacaoTemporal');
    } catch (error) {
      dispatch(ordenacaoTemporal.actions.hasError(error));
      console.log('erro: update ordenacaoTemporal');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(ordenacaoTemporal.actions.loading());
    try {
      const response = await axios.put('/ordenacao_temporal/', event);
      dispatch(ordenacaoTemporal.actions.excluir([response.data]));
      console.log('sucesso: delete ordenacaoTemporal');
    } catch (error) {
      dispatch(ordenacaoTemporal.actions.hasError(error));
      console.log('erro: delete ordenacaoTemporal');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(ordenacaoTemporal.actions.loading());
    try {
      const response = await axios.post('/ordenacao_temporal', newEvent);
      dispatch(ordenacaoTemporal.actions.novo(response.data));
    } catch (error) {
      dispatch(ordenacaoTemporal.actions.hasError(error));
    }
  };
}

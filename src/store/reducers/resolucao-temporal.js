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

const resolucaoTemporal = createSlice({
  name: 'resolucaoTemporal',
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

export default resolucaoTemporal.reducer;

export const { data, isLoader } = resolucaoTemporal.actions;

export function getAll() {
  return async () => {
    dispatch(resolucaoTemporal.actions.loading());
    try {
      const response = await axios.get('/resolucao_temporal');
      console.log(response.data);
      dispatch(
        resolucaoTemporal.actions.setAll(
          response.data.map(
            ({
              id_resolucao_temporal,
              ds_resolucao_temporal,
              cs_recusa,
              cs_frequencia,
              cs_0,
              cs_2,
              cs_5,
              cs_10,
              cs_15,
              cs_20,
              cs_25,
              cs_30,
              cs_40
            }) => ({
              ID: id_resolucao_temporal,
              ds_resolucao_temporal: ds_resolucao_temporal,
              cs_recusa: cs_recusa,
              cs_frequencia: cs_frequencia,
              cs_0: cs_0,
              cs_2: cs_2,
              cs_5: cs_5,
              cs_10: cs_10,
              cs_15: cs_15,
              cs_20: cs_20,
              cs_25: cs_25,
              cs_30: cs_30,
              cs_40: cs_40
            })
          )
        )
      );
    } catch (error) {
      dispatch(resolucaoTemporal.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(resolucaoTemporal.actions.loading());
    try {
      const response = await axios.get('/resolucao_temporal/editar/' + id);
      dispatch(resolucaoTemporal.actions.setId(response.data));
      console.log('sucesso: getId resolucaoTemporal');
    } catch (error) {
      dispatch(resolucaoTemporal.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(resolucaoTemporal.actions.loading());
    try {
      const response = await axios.put('/resolucao_temporal/editar/' + id, event);
      dispatch(resolucaoTemporal.actions.editar(response.data));
      console.log('sucesso: update resolucaoTemporal');
    } catch (error) {
      dispatch(resolucaoTemporal.actions.hasError(error));
      console.log('erro: update resolucaoTemporal');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(resolucaoTemporal.actions.loading());
    try {
      const response = await axios.put('/resolucao_temporal/', event);
      dispatch(resolucaoTemporal.actions.excluir([response.data]));
      console.log('sucesso: delete resolucaoTemporal');
    } catch (error) {
      dispatch(resolucaoTemporal.actions.hasError(error));
      console.log('erro: delete resolucaoTemporal');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(resolucaoTemporal.actions.loading());
    try {
      const response = await axios.post('/resolucao_temporal', newEvent);
      dispatch(resolucaoTemporal.actions.novo(response.data));
    } catch (error) {
      dispatch(resolucaoTemporal.actions.hasError(error));
    }
  };
}

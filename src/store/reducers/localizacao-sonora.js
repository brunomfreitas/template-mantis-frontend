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

const localizacaoSonora = createSlice({
  name: 'localizacaoSonora',
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

export default localizacaoSonora.reducer;

export const { data, isLoader } = localizacaoSonora.actions;

export function getAll() {
  return async () => {
    dispatch(localizacaoSonora.actions.loading());
    try {
      const response = await axios.get('/localizacao_sonora');
      console.log(response.data);
      dispatch(
        localizacaoSonora.actions.setAll(
          response.data.map(
            ({ id_localizacao_sonora, ds_localizacao_sonora, cs_recusa, cs_mosquito, cs_tesoura, cs_porta, cs_sino, cs_latido }) => ({
              ID: id_localizacao_sonora,
              ds_localizacao_sonora: ds_localizacao_sonora,
              cs_recusa: cs_recusa,
              cs_mosquito: cs_mosquito,
              cs_tesoura: cs_tesoura,
              cs_porta: cs_porta,
              cs_sino: cs_sino,
              cs_latido: cs_latido
            })
          )
        )
      );
    } catch (error) {
      dispatch(localizacaoSonora.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(localizacaoSonora.actions.loading());
    try {
      const response = await axios.get('/localizacao_sonora/editar/' + id);
      dispatch(localizacaoSonora.actions.setId(response.data));
      console.log('sucesso: getId localizacaoSonora');
    } catch (error) {
      dispatch(localizacaoSonora.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(localizacaoSonora.actions.loading());
    try {
      const response = await axios.put('/localizacao_sonora/editar/' + id, event);
      dispatch(localizacaoSonora.actions.editar(response.data));
      console.log('sucesso: update localizacaoSonora');
    } catch (error) {
      dispatch(localizacaoSonora.actions.hasError(error));
      console.log('erro: update localizacaoSonora');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(localizacaoSonora.actions.loading());
    try {
      const response = await axios.put('/localizacao_sonora/', event);
      dispatch(localizacaoSonora.actions.excluir([response.data]));
      console.log('sucesso: delete localizacaoSonora');
    } catch (error) {
      dispatch(localizacaoSonora.actions.hasError(error));
      console.log('erro: delete localizacaoSonora');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(localizacaoSonora.actions.loading());
    try {
      const response = await axios.post('/localizacao_sonora', newEvent);
      dispatch(localizacaoSonora.actions.novo(response.data));
    } catch (error) {
      dispatch(localizacaoSonora.actions.hasError(error));
    }
  };
}

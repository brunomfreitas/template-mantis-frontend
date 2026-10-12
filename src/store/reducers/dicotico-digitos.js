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

const dicoticoDigitos = createSlice({
  name: 'dicoticoDigitos',
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

export default dicoticoDigitos.reducer;

export const { data, isLoader } = dicoticoDigitos.actions;

export function getAll() {
  return async () => {
    dispatch(dicoticoDigitos.actions.loading());
    try {
      const response = await axios.get('/dicotico_digitos');
      console.log(response.data);
      dispatch(
        dicoticoDigitos.actions.setAll(
          response.data.map(
            ({
              id_dicotico_digitos,
              ds_dicotico_digitos,
              cs_recusa,
              cs_destro,
              cs_canhoto,
              cs_f_1_1,
              cs_f_1_2,
              cs_f_1_3,
              cs_f_1_4,
              cs_f_2_1,
              cs_f_2_2,
              cs_f_2_3,
              cs_f_2_4,
              cs_f_3_1,
              cs_f_3_2,
              cs_f_3_3,
              cs_f_3_4,
              cs_f_4_1,
              cs_f_4_2,
              cs_f_4_3,
              cs_f_4_4,
              cs_f_5_1,
              cs_f_5_2,
              cs_f_5_3,
              cs_f_5_4
            }) => ({
              ID: id_dicotico_digitos,
              ds_dicotico_digitos: ds_dicotico_digitos,
              cs_recusa: cs_recusa,
              cs_destro: cs_destro,
              cs_canhoto: cs_canhoto,
              cs_f_1_1: cs_f_1_1,
              cs_f_1_2: cs_f_1_2,
              cs_f_1_3: cs_f_1_3,
              cs_f_1_4: cs_f_1_4,
              cs_f_2_1: cs_f_2_1,
              cs_f_2_2: cs_f_2_2,
              cs_f_2_3: cs_f_2_3,
              cs_f_2_4: cs_f_2_4,
              cs_f_3_1: cs_f_3_1,
              cs_f_3_2: cs_f_3_2,
              cs_f_3_3: cs_f_3_3,
              cs_f_3_4: cs_f_3_4,
              cs_f_4_1: cs_f_4_1,
              cs_f_4_2: cs_f_4_2,
              cs_f_4_3: cs_f_4_3,
              cs_f_4_4: cs_f_4_4,
              cs_f_5_1: cs_f_5_1,
              cs_f_5_2: cs_f_5_2,
              cs_f_5_3: cs_f_5_3,
              cs_f_5_4: cs_f_5_4
            })
          )
        )
      );
    } catch (error) {
      dispatch(dicoticoDigitos.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(dicoticoDigitos.actions.loading());
    try {
      const response = await axios.get('/dicotico_digitos/editar/' + id);
      dispatch(dicoticoDigitos.actions.setId(response.data));
      console.log('sucesso: getId dicoticoDigitos');
    } catch (error) {
      dispatch(dicoticoDigitos.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(dicoticoDigitos.actions.loading());
    try {
      const response = await axios.put('/dicotico_digitos/editar/' + id, event);
      dispatch(dicoticoDigitos.actions.editar(response.data));
      console.log('sucesso: update dicoticoDigitos');
    } catch (error) {
      dispatch(dicoticoDigitos.actions.hasError(error));
      console.log('erro: update dicoticoDigitos');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(dicoticoDigitos.actions.loading());
    try {
      const response = await axios.put('/dicotico_digitos/', event);
      dispatch(dicoticoDigitos.actions.excluir([response.data]));
      console.log('sucesso: delete dicoticoDigitos');
    } catch (error) {
      dispatch(dicoticoDigitos.actions.hasError(error));
      console.log('erro: delete dicoticoDigitos');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(dicoticoDigitos.actions.loading());
    try {
      const response = await axios.post('/dicotico_digitos', newEvent);
      dispatch(dicoticoDigitos.actions.novo(response.data));
    } catch (error) {
      dispatch(dicoticoDigitos.actions.hasError(error));
    }
  };
}

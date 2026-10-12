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

const dicoticoSequencial = createSlice({
  name: 'dicoticoSequencial',
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

export default dicoticoSequencial.reducer;

export const { data, isLoader } = dicoticoSequencial.actions;

export function getAll() {
  return async () => {
    dispatch(dicoticoSequencial.actions.loading());
    try {
      const response = await axios.get('/dicotico_sequencial');
      console.log(response.data);
      dispatch(
        dicoticoSequencial.actions.setAll(
          response.data.map(
            ({
              id_dicotico_sequencial,
              ds_dicotico_sequencial,
              cs_recusa,
              cs_l_1_a,
              cs_l_2_a,
              cs_l_3_a,
              cs_l_4_a,
              cs_l_5_a,
              cs_l_1_b,
              cs_l_2_b,
              cs_l_3_b,
              cs_l_4_b,
              cs_l_5_b,
              cs_l_1_c,
              cs_l_2_c,
              cs_l_3_c,
              cs_l_4_c,
              cs_l_5_c,
              cs_l_1_d,
              cs_l_2_d,
              cs_l_3_d,
              cs_l_4_d,
              cs_l_5_d,
              cs_l_1_e,
              cs_l_2_e,
              cs_l_3_e,
              cs_l_4_e,
              cs_l_5_e,
              cs_l_1_f,
              cs_l_2_f,
              cs_l_3_f,
              cs_l_4_f,
              cs_l_5_f,
              cs_l_1_g,
              cs_l_2_g,
              cs_l_3_g,
              cs_l_4_g,
              cs_l_5_g,
              cs_l_1_h,
              cs_l_2_h,
              cs_l_3_h,
              cs_l_4_h,
              cs_l_5_h
            }) => ({
              ID: id_dicotico_sequencial,
              ds_dicotico_sequencial: ds_dicotico_sequencial,
              cs_recusa: cs_recusa,
              cs_l_1_a: cs_l_1_a,
              cs_l_2_a: cs_l_2_a,
              cs_l_3_a: cs_l_3_a,
              cs_l_4_a: cs_l_4_a,
              cs_l_5_a: cs_l_5_a,
              cs_l_1_b: cs_l_1_b,
              cs_l_2_b: cs_l_2_b,
              cs_l_3_b: cs_l_3_b,
              cs_l_4_b: cs_l_4_b,
              cs_l_5_b: cs_l_5_b,
              cs_l_1_c: cs_l_1_c,
              cs_l_2_c: cs_l_2_c,
              cs_l_3_c: cs_l_3_c,
              cs_l_4_c: cs_l_4_c,
              cs_l_5_c: cs_l_5_c,
              cs_l_1_d: cs_l_1_d,
              cs_l_2_d: cs_l_2_d,
              cs_l_3_d: cs_l_3_d,
              cs_l_4_d: cs_l_4_d,
              cs_l_5_d: cs_l_5_d,
              cs_l_1_e: cs_l_1_e,
              cs_l_2_e: cs_l_2_e,
              cs_l_3_e: cs_l_3_e,
              cs_l_4_e: cs_l_4_e,
              cs_l_5_e: cs_l_5_e,
              cs_l_1_f: cs_l_1_f,
              cs_l_2_f: cs_l_2_f,
              cs_l_3_f: cs_l_3_f,
              cs_l_4_f: cs_l_4_f,
              cs_l_5_f: cs_l_5_f,
              cs_l_1_g: cs_l_1_g,
              cs_l_2_g: cs_l_2_g,
              cs_l_3_g: cs_l_3_g,
              cs_l_4_g: cs_l_4_g,
              cs_l_5_g: cs_l_5_g,
              cs_l_1_h: cs_l_1_h,
              cs_l_2_h: cs_l_2_h,
              cs_l_3_h: cs_l_3_h,
              cs_l_4_h: cs_l_4_h,
              cs_l_5_h: cs_l_5_h
            })
          )
        )
      );
    } catch (error) {
      dispatch(dicoticoSequencial.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(dicoticoSequencial.actions.loading());
    try {
      const response = await axios.get('/dicotico_sequencial/editar/' + id);
      dispatch(dicoticoSequencial.actions.setId(response.data));
      console.log('sucesso: getId dicoticoSequencial');
    } catch (error) {
      dispatch(dicoticoSequencial.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(dicoticoSequencial.actions.loading());
    try {
      const response = await axios.put('/dicotico_sequencial/editar/' + id, event);
      dispatch(dicoticoSequencial.actions.editar(response.data));
      console.log('sucesso: update dicoticoSequencial');
    } catch (error) {
      dispatch(dicoticoSequencial.actions.hasError(error));
      console.log('erro: update dicoticoSequencial');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(dicoticoSequencial.actions.loading());
    try {
      const response = await axios.put('/dicotico_sequencial/', event);
      dispatch(dicoticoSequencial.actions.excluir([response.data]));
      console.log('sucesso: delete dicoticoSequencial');
    } catch (error) {
      dispatch(dicoticoSequencial.actions.hasError(error));
      console.log('erro: delete dicoticoSequencial');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(dicoticoSequencial.actions.loading());
    try {
      const response = await axios.post('/dicotico_sequencial', newEvent);
      dispatch(dicoticoSequencial.actions.novo(response.data));
    } catch (error) {
      dispatch(dicoticoSequencial.actions.hasError(error));
    }
  };
}

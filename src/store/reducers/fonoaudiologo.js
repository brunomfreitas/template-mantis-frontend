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

const fono = createSlice({
  name: 'fono',
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
    select(state, action) {
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

export default fono.reducer;

export const { data, isLoader } = fono.actions;

export function getAll() {
  return async () => {
    dispatch(fono.actions.loading());
    try {
      const response = await axios.get('/fonoaudiologo');
      console.log(response.data);
      dispatch(
        fono.actions.setAll(
          response.data.map(
            ({ id_fonoaudiologo, nm_fonoaudiologo, nr_cpf, dt_nascimento, dt_admissao, cs_genero, nr_telefone, nm_email, st_ativo }) => ({
              ID: id_fonoaudiologo,
              nm_fonoaudiologo: nm_fonoaudiologo,
              nr_cpf: nr_cpf,
              dt_nascimento: dt_nascimento === null ? null : new Date(dt_nascimento).toISOString().split('T')[0],
              dt_admissao: dt_admissao === null ? null : new Date(dt_admissao).toISOString().split('T')[0],
              cs_genero: cs_genero,
              nr_telefone: nr_telefone,
              nm_email: nm_email,
              st_ativo: st_ativo
            })
          )
        )
      );
    } catch (error) {
      dispatch(fono.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(fono.actions.loading());
    try {
      const response = await axios.get('/fonoaudiologo/editar/' + id);
      const edit = {
        id_fonoaudiologo: response.data.id_fonoaudiologo,
        nm_fonoaudiologo: response.data.nm_fonoaudiologo,
        nr_cpf: response.data.nr_cpf,
        nr_crf: response.data.nr_crf,
        dt_nascimento: response.data.dt_nascimento === null ? null : new Date(response.data.dt_nascimento).toISOString().split('T')[0],
        dt_admissao: response.data.dt_admissao === null ? null : new Date(response.data.dt_admissao).toISOString().split('T')[0],
        cs_genero: response.data.cs_genero,
        nr_telefone: response.data.nr_telefone,
        nm_email: response.data.nm_email,
        st_ativo: response.data.st_ativo
      };
      if (edit) {
        dispatch(fono.actions.setId(edit));
      }
    } catch (error) {
      dispatch(fono.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(fono.actions.loading());
    try {
      const response = await axios.put('/fonoaudiologo/editar/' + id, event);
      dispatch(fono.actions.editar(response.data));
      console.log('sucesso: update fonoaudiologo');
    } catch (error) {
      dispatch(fono.actions.hasError(error));
      console.log('erro: update fonoaudiologo');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(fono.actions.loading());
    try {
      const response = await axios.put('/fonoaudiologo/', event);
      // dispatch(fonoaudiologo.actions.updateEvent(response.data));
      dispatch(fono.actions.excluir([response.data]));
      console.log('sucesso: delete fonoaudiologo');
    } catch (error) {
      dispatch(fono.actions.hasError(error));
      console.log('erro: delete fonoaudiologo');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(fono.actions.loading());
    try {
      const response = await axios.post('/fonoaudiologo', newEvent);
      dispatch(fono.actions.novo(response.data));
    } catch (error) {
      dispatch(fono.actions.hasError(error));
    }
  };
}

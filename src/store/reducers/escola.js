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

const escola = createSlice({
  name: 'escola',
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

export default escola.reducer;

export const { data, isLoader, toggleModal } = escola.actions;

export function getAll() {
  return async () => {
    dispatch(escola.actions.loading());
    try {
      const response = await axios.get('/escola');
      dispatch(
        escola.actions.setAll(
          response.data.map(
            ({ id_escola, nm_escola, nr_cnpj, nr_telefone, nm_email, nm_responsavel, nm_regiao_administrativa, st_ativo }) => ({
              ID: id_escola,
              nm_escola: nm_escola,
              nr_cnpj: nr_cnpj,
              nr_telefone: nr_telefone,
              nm_email: nm_email,
              nm_responsavel: nm_responsavel,
              nm_regiao_administrativa: nm_regiao_administrativa,
              st_ativo: st_ativo
            })
          )
        )
      );
    } catch (error) {
      dispatch(escola.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(escola.actions.loading());
    try {
      const response = await axios.get('/escola/editar/' + id);
      const edit = {
        id_escola: response.data.id_escola || '',
        nm_escola: response.data.nm_escola || '',
        nr_cnpj: response.data.nr_cnpj || '',
        nr_telefone: response.data.nr_telefone || '',
        nm_email: response.data.nm_email || '',
        nm_responsavel: response.data.nm_responsavel || '',
        nm_regiao_administrativa: response.data.nm_regiao_administrativa || '',
        st_ativo: response.data.st_ativo || ''
      };
      if (edit) {
        dispatch(escola.actions.setId(edit));
      }
    } catch (error) {
      dispatch(escola.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(escola.actions.loading());
    try {
      const response = await axios.put('/escola/editar/' + id, event);
      dispatch(escola.actions.editar(response.data));
      console.log('sucesso: update escola');
    } catch (error) {
      dispatch(escola.actions.hasError(error));
      console.log('erro: update escola');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(escola.actions.loading());
    try {
      const response = await axios.put('/escola/', event);
      dispatch(escola.actions.excluir([response.data]));
      console.log('sucesso: delete escola');
    } catch (error) {
      dispatch(escola.actions.hasError(error));
      console.log('erro: delete escola');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(escola.actions.loading());
    try {
      const response = await axios.post('/escola', newEvent);
      dispatch(escola.actions.novo(response.data));
    } catch (error) {
      dispatch(escola.actions.hasError(error));
    }
  };
}

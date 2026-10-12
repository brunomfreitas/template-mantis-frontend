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

// ==============================|| PLANO SAUDE ||============================== //

const planoSaude = createSlice({
  name: 'planoSaude',
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

export default planoSaude.reducer;

export const { data, toggleModal, isLoader } = planoSaude.actions;

export function getAll() {
  return async () => {
    dispatch(planoSaude.actions.loading());
    try {
      const response = await axios.get('/plano_saude');
      dispatch(
        planoSaude.actions.setAll(
          response.data.map(({ id_plano_saude, nm_plano_saude, nr_cnpj, nr_telefone, nm_email, st_ativo }) => ({
            ID: id_plano_saude,
            nm_plano_saude: nm_plano_saude,
            nr_cnpj: nr_cnpj,
            nr_telefone: nr_telefone,
            nm_email: nm_email,
            st_ativo: st_ativo
          }))
        )
      );
    } catch (error) {
      dispatch(planoSaude.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(planoSaude.actions.loading());
    try {
      const response = await axios.get('/plano_saude/editar/' + id);
      const edit = {
        id_plano_saude: response.data.id_plano_saude,
        nm_plano_saude: response.data.nm_plano_saude,
        nr_cnpj: response.data.nr_cnpj,
        nr_telefone: response.data.nr_telefone,
        nm_email: response.data.nm_email,
        st_ativo: response.data.st_ativo
      };
      if (edit) {
        dispatch(planoSaude.actions.setId(edit));
      }
    } catch (error) {
      dispatch(planoSaude.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(planoSaude.actions.loading());
    try {
      const response = await axios.put('/plano_saude/editar/' + id, event);
      dispatch(planoSaude.actions.editar(response.data));
      console.log('sucesso: update escola');
    } catch (error) {
      dispatch(planoSaude.actions.hasError(error));
      console.log('erro: update escola');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(planoSaude.actions.loading());
    try {
      const response = await axios.put('/plano_saude/', event);
      dispatch(planoSaude.actions.excluir([response.data]));
      console.log('sucesso: delete escola');
    } catch (error) {
      dispatch(planoSaude.actions.hasError(error));
      console.log('erro: delete escola');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(planoSaude.actions.loading());
    try {
      const response = await axios.post('/plano_saude', newEvent);
      dispatch(planoSaude.actions.novo(response.data));
    } catch (error) {
      dispatch(planoSaude.actions.hasError(error));
    }
  };
}

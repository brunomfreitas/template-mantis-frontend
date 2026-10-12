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

const assistente = createSlice({
  name: 'assistente',
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

export default assistente.reducer;

export const { data, isLoader } = assistente.actions;

export function getAll() {
  return async () => {
    dispatch(assistente.actions.loading());
    try {
      const response = await axios.get('/assistente');
      console.log(response.data);
      dispatch(
        assistente.actions.setAll(
          response.data.map(
            ({
              id_assistente,
              nm_assistente,
              nr_cpf,
              dt_nascimento,
              cs_genero,
              nr_telefone,
              nm_email,
              dt_admissao,
              vl_salario,
              cs_funcao,
              st_ativo
            }) => ({
              ID: id_assistente,
              nm_assistente: nm_assistente,
              nr_cpf: nr_cpf,
              dt_nascimento: dt_nascimento,
              cs_genero: cs_genero,
              nr_telefone: nr_telefone,
              nm_email: nm_email,
              dt_admissao: dt_admissao,
              vl_salario: vl_salario,
              cs_funcao: cs_funcao,
              st_ativo: st_ativo
            })
          )
        )
      );
    } catch (error) {
      dispatch(assistente.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(assistente.actions.loading());
    try {
      const response = await axios.get('/assistente/editar/' + id);
      const edit = {
        id_assistente: response.data.id_assistente,
        nm_assistente: response.data.nm_assistente,
        nr_cpf: response.data.nr_cpf,
        dt_nascimento: response.data.dt_nascimento,
        cs_genero: response.data.cs_genero,
        nr_telefone: response.data.nr_telefone,
        nm_email: response.data.nm_email,
        vl_salario: response.data.vl_salario,
        dt_admissao: response.data.dt_admissao,
        cs_funcao: response.data.cs_funcao,
        st_ativo: response.data.st_ativo
      };
      if (edit) {
        dispatch(assistente.actions.setId(edit));
      }
    } catch (error) {
      dispatch(assistente.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(assistente.actions.loading());
    try {
      const response = await axios.put('/assistente/editar/' + id, event);
      dispatch(assistente.actions.editar(response.data));
      console.log('sucesso: update assistente');
    } catch (error) {
      dispatch(assistente.actions.hasError(error));
      console.log('erro: update assistente');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(assistente.actions.loading());
    try {
      const response = await axios.put('/assistente/', event);
      dispatch(assistente.actions.excluir([response.data]));
      console.log('sucesso: delete assistente');
    } catch (error) {
      dispatch(assistente.actions.hasError(error));
      console.log('erro: delete assistente');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(assistente.actions.loading());
    try {
      const response = await axios.post('/assistente', newEvent);
      dispatch(assistente.actions.novo(response.data));
    } catch (error) {
      dispatch(assistente.actions.hasError(error));
    }
  };
}

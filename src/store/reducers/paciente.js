import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
  error: false,
  data: [],
  isLoader: false,
  isModalOpen: false,
  selectedId: null,
  selectedRange: null
};

// ==============================|| CALENDAR - SLICE ||============================== //

const paciente = createSlice({
  name: 'paciente',
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

    // select date range
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isModalOpen = true;
      state.selectedRange = { start, end };
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

export default paciente.reducer;

export const { data, isLoader } = paciente.actions;

export function getAll() {
  return async () => {
    dispatch(paciente.actions.loading());
    try {
      const response = await axios.get('/paciente');
      dispatch(
        paciente.actions.setAll(
          response.data.map(
            ({ id_paciente, nm_paciente, nr_cpf, dt_nascimento, cs_genero, nr_telefone, nm_email, nm_responsavel, st_ativo }) => ({
              ID: id_paciente,
              nm_paciente: nm_paciente,
              nr_cpf: nr_cpf,
              dt_nascimento: dt_nascimento === null ? null : new Date(dt_nascimento).toISOString().split('T')[0],
              cs_genero: cs_genero,
              nr_telefone: nr_telefone,
              nm_email: nm_email,
              nm_responsavel: nm_responsavel,
              st_ativo: st_ativo
            })
          )
        )
      );
    } catch (error) {
      dispatch(paciente.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(paciente.actions.loading());
    try {
      const response = await axios.get('/paciente/editar/' + id);
      const edit = {
        id_paciente: response.data.id_paciente,
        nm_paciente: response.data.nm_paciente,
        nr_cpf: response.data.nr_cpf,
        dt_nascimento: response.data.dt_nascimento === null ? null : new Date(response.data.dt_nascimento).toISOString().split('T')[0],
        cs_genero: response.data.cs_genero,
        nr_telefone: response.data.nr_telefone,
        nm_email: response.data.nm_email,
        nm_responsavel: response.data.nm_responsavel,
        st_ativo: response.data.st_ativo
      };
      if (edit) {
        dispatch(paciente.actions.setId(edit));
      }
    } catch (error) {
      dispatch(paciente.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(paciente.actions.loading());
    try {
      const response = await axios.put('/paciente/editar/' + id, event);
      dispatch(paciente.actions.editar(response.data));
      console.log('sucesso: update paciente');
    } catch (error) {
      dispatch(paciente.actions.hasError(error));
      console.log('erro: update paciente');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(paciente.actions.loading());
    try {
      const response = await axios.put('/paciente/', event);
      dispatch(paciente.actions.excluir(response.data));
      console.log('sucesso: delete paciente');
    } catch (error) {
      dispatch(paciente.actions.hasError(error));
      console.log('erro: delete paciente');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(paciente.actions.loading());
    try {
      const response = await axios.post('/paciente', newEvent);
      dispatch(paciente.actions.novo(response.data));
    } catch (error) {
      dispatch(paciente.actions.hasError(error));
    }
  };
}

export function selectRange(start, end) {
  return async () => {
    dispatch(
      paciente.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    );
  };
}

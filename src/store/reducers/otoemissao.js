import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
  error: false,
  otoemissao: [],
  isLoader: false,
  isModalOpen: false,
  selectedId: null
};

// ==============================|| MEATOSCOPIA ||============================== //

const otoemissao = createSlice({
  name: 'otoemissao',
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
      state.otoemissao = action.payload;
    },

    // event list
    setId(state, action) {
      state.isLoader = false;
      state.otoemissao = action.payload;
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
      state.otoemissao = action.payload;
    },

    // update event
    editar(state, action) {
      state.isLoader = false;
      state.isModalOpen = false;
      state.selectedId = null;
      state.otoemissao = action.payload;
    },

    // delete event
    excluir(state, action) {
      state.isLoader = false;
      state.otoemissao = action.payload;
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

export default otoemissao.reducer;

export const { selectOtoemissao, toggleModal } = otoemissao.actions;

export function getAll() {
  return async () => {
    dispatch(otoemissao.actions.loading());
    try {
      const response = await axios.get('/otoemissao');
      console.log(response.data);
      dispatch(
        otoemissao.actions.setAll(
          response.data.map(({ id_otoemissao, oe_presente, od_presente, oe_ausente, od_ausente, ds_otoemissao }) => ({
            ID: id_otoemissao,
            oe_presente: oe_presente,
            od_presente: od_presente,
            oe_ausente: oe_ausente,
            od_ausente: od_ausente,
            ds_otoemissao: ds_otoemissao
          }))
        )
      );
    } catch (error) {
      dispatch(otoemissao.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(otoemissao.actions.loading());
    try {
      const response = await axios.get('/otoemissao/editar/' + id);

      const edit = {
        id_otoemissao: response.data.id_otoemissao,
        oe_presente: response.data.oe_presente,
        od_presente: response.data.od_presente,
        oe_ausente: response.data.oe_ausente,
        od_ausente: response.data.od_ausente,
        ds_otoemissao: response.data.ds_otoemissao
      };
      if (edit) {
        dispatch(otoemissao.actions.setId(edit));
      }
    } catch (error) {
      dispatch(otoemissao.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(otoemissao.actions.loading());
    try {
      const response = await axios.put('/otoemissao/editar/' + id, event);
      dispatch(otoemissao.actions.editar(response.data));
      console.log('sucesso: update otoemissao');
    } catch (error) {
      dispatch(otoemissao.actions.hasError(error));
      console.log('erro: update otoemissao');
    }
  };
}

export function excluir(event) {
  return async (dispatch) => {
    dispatch(otoemissao.actions.loading());
    try {
      await axios.put('/otoemissao/', event);
      dispatch(otoemissao.actions.excluir(response.data));
      console.log('sucesso: delete otoemissao');
    } catch (error) {
      dispatch(otoemissao.actions.hasError(error));
      console.log('erro: delete otoemissao');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(otoemissao.actions.loading());
    try {
      const response = await axios.post('/otoemissao', newEvent);
      dispatch(otoemissao.actions.novo(response.data));
    } catch (error) {
      dispatch(otoemissao.actions.hasError(error));
    }
  };
}

import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
  error: false,
  audiometria: [],
  isLoader: false,
  isModalOpen: false,
  selectedId: null
};

// ==============================|| MEATOSCOPIA ||============================== //

const audiometria = createSlice({
  name: 'audiometria',
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
      state.audiometria = action.payload;
    },

    // event list
    setId(state, action) {
      state.isLoader = false;
      state.audiometria = action.payload;
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
      state.audiometria = action.payload;
    },

    // update event
    editar(state, action) {
      state.isLoader = false;
      state.isModalOpen = false;
      state.selectedId = null;
      state.audiometria = action.payload;
    },

    // delete event
    excluir(state, action) {
      state.isLoader = false;
      state.audiometria = action.payload;
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

export default audiometria.reducer;

export const { selectId, toggleModal } = audiometria.actions;

export function getAll() {
  return async () => {
    dispatch(audiometria.actions.loading());
    try {
      const response = await axios.get('/audiometria');
      console.log(response.data);
      dispatch(
        audiometria.actions.setAll(
          response.data.map(({ id_audiometria, cs_procedimento, oe_curva, od_curva, ds_audiometria }) => ({
            ID: id_audiometria,
            cs_procedimento: cs_procedimento,
            oe_curva: oe_curva,
            od_curva: od_curva,
            ds_audiometria: ds_audiometria
          }))
        )
      );
    } catch (error) {
      dispatch(audiometria.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(audiometria.actions.loading());
    try {
      const response = await axios.get('/audiometria/editar/' + id);

      const edit = {
        id_audiometria: response.data.id_audiometria,
        cs_procedimento: response.data.cs_procedimento,
        oe_curva: response.data.oe_curva,
        od_curva: response.data.od_curva,
        ds_audiometria: response.data.ds_audiometria
      };
      if (edit) {
        dispatch(audiometria.actions.setId(edit));
      }
    } catch (error) {
      dispatch(audiometria.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(audiometria.actions.loading());
    try {
      const response = await axios.put('/audiometria/editar/' + id, event);
      dispatch(audiometria.actions.editar(response.data));
      console.log('sucesso: update audiometria');
    } catch (error) {
      dispatch(audiometria.actions.hasError(error));
      console.log('erro: update audiometria');
    }
  };
}

export function excluir(event) {
  return async (dispatch) => {
    dispatch(audiometria.actions.loading());
    try {
      await axios.put('/audiometria/', event);
      dispatch(audiometria.actions.excluir(response.data));
      console.log('sucesso: delete audiometria');
    } catch (error) {
      dispatch(audiometria.actions.hasError(error));
      console.log('erro: delete audiometria');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(audiometria.actions.loading());
    try {
      const response = await axios.post('/audiometria', newEvent);
      dispatch(audiometria.actions.novo(response.data));
    } catch (error) {
      dispatch(audiometria.actions.hasError(error));
    }
  };
}

import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
  error: false,
  impedanciometria: [],
  isLoader: false,
  isModalOpen: false,
  selectedId: null
};

// ==============================|| IMPEDANCIOMETRIA ||============================== //

const impedanciometria = createSlice({
  name: 'impedanciometria',
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
      state.impedanciometria = action.payload;
    },

    // event list
    setId(state, action) {
      state.isLoader = false;
      state.impedanciometria = action.payload;
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
      state.impedanciometria = action.payload;
    },

    // update event
    editar(state, action) {
      state.isLoader = false;
      state.isModalOpen = false;
      state.selectedId = null;
      state.impedanciometria = action.payload;
    },

    // delete event
    excluir(state, action) {
      state.isLoader = false;
      state.impedanciometria = action.payload;
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

export default impedanciometria.reducer;

export const { selectId, toggleModal } = impedanciometria.actions;

export function getAll() {
  return async () => {
    dispatch(impedanciometria.actions.loading());
    try {
      const response = await axios.get('/impedanciometria');
      console.log(response.data);
      dispatch(
        impedanciometria.actions.setAll(
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
      dispatch(impedanciometria.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(impedanciometria.actions.loading());
    try {
      const response = await axios.get('/impedanciometria/editar/' + id);

      const edit = {
        id_audiometria: response.data.id_audiometria,
        cs_procedimento: response.data.cs_procedimento,
        oe_curva: response.data.oe_curva,
        od_curva: response.data.od_curva,
        ds_audiometria: response.data.ds_audiometria
      };
      if (edit) {
        dispatch(impedanciometria.actions.setId(edit));
      }
    } catch (error) {
      dispatch(impedanciometria.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(impedanciometria.actions.loading());
    try {
      const response = await axios.put('/impedanciometria/editar/' + id, event);
      dispatch(impedanciometria.actions.editar(response.data));
    } catch (error) {
      dispatch(impedanciometria.actions.hasError(error));
    }
  };
}

export function excluir(event) {
  return async (dispatch) => {
    dispatch(impedanciometria.actions.loading());
    try {
      await axios.put('/impedanciometria/', event);
      dispatch(impedanciometria.actions.excluir(response.data));
    } catch (error) {
      dispatch(impedanciometria.actions.hasError(error));
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(impedanciometria.actions.loading());
    try {
      const response = await axios.post('/impedanciometria', newEvent);
      dispatch(impedanciometria.actions.novo(response.data));
    } catch (error) {
      dispatch(impedanciometria.actions.hasError(error));
    }
  };
}

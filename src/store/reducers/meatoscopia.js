import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
  error: false,
  meatoscopia: [],
  isLoader: false,
  isModalOpen: false,
  selectedMeatoscopiaId: null
};

// ==============================|| MEATOSCOPIA ||============================== //

const meatoscopia = createSlice({
  name: 'meatoscopia',
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
    setMeatoscopias(state, action) {
      state.isLoader = false;
      state.meatoscopia = action.payload;
    },

    // event list
    setMeatoscopiaId(state, action) {
      state.isLoader = false;
      state.meatoscopia = action.payload;
    },

    // select event
    selectMeatoscopia(state, action) {
      const eventId = action.payload;
      state.isModalOpen = true;
      state.selectedMeatoscopiaId = eventId;
    },

    // create event
    novo(state, action) {
      state.isLoader = false;
      state.isModalOpen = false;
      state.meatoscopia = action.payload;
    },

    // update event
    editar(state, action) {
      state.isLoader = false;
      state.isModalOpen = false;
      state.selectedMeatoscopiaId = null;
      state.meatoscopia = action.payload;
    },

    // delete event
    excluir(state, action) {
      state.isLoader = false;
      state.meatoscopia = action.payload;
    },

    // modal toggle
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
      if (state.isModalOpen === false) {
        state.selectedMeatoscopiaId = null;
        state.selectedRange = null;
      }
    }
  }
});

export default meatoscopia.reducer;

export const { selectMeatoscopia, toggleModal } = meatoscopia.actions;

export function getMeatoscopias() {
  return async () => {
    dispatch(meatoscopia.actions.loading());
    try {
      const response = await axios.get('/meatoscopia');
      console.log(response.data);
      dispatch(
        meatoscopia.actions.setMeatoscopias(
          response.data.map(
            ({
              id_meatoscopia,
              oe_cera,
              od_cera,
              oe_inflamado,
              od_inflamado,
              oe_corpo_estranho,
              od_corpo_estranho,
              oe_normal,
              od_normal,
              cs_recusa,
              ds_meatoscopia
            }) => ({
              ID: id_meatoscopia,
              oe_cera: oe_cera,
              od_cera: od_cera,
              oe_inflamado: oe_inflamado,
              od_inflamado: od_inflamado,
              oe_corpo_estranho: oe_corpo_estranho,
              od_corpo_estranho: od_corpo_estranho,
              oe_normal: oe_normal,
              od_normal: od_normal,
              cs_recusa: cs_recusa,
              ds_meatoscopia: ds_meatoscopia
            })
          )
        )
      );
    } catch (error) {
      dispatch(meatoscopia.actions.hasError(error));
    }
  };
}

export function getMeatoscopiaId(id) {
  return async () => {
    dispatch(meatoscopia.actions.loading());
    try {
      const response = await axios.get('/meatoscopia/editar/' + id);

      const edit = {
        id_meatoscopia: response.data.id_prontuario,
        oe_cera: response.data.oe_cera,
        od_cera: response.data.od_cera,
        oe_inflamado: response.data.oe_inflamado,
        od_inflamado: response.data.od_inflamado,
        oe_corpo_estranho: response.data.oe_corpo_estranho,
        od_corpo_estranho: response.data.od_corpo_estranho,
        oe_normal: response.data.oe_normal,
        od_normal: response.data.od_normal,
        cs_recusa: response.data.cs_recusa,
        ds_meatoscopia: response.data.ds_meatoscopia
      };
      if (edit) {
        dispatch(meatoscopia.actions.setMeatoscopiaId(edit));
      }
    } catch (error) {
      dispatch(meatoscopia.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(meatoscopia.actions.loading());
    try {
      const response = await axios.put('/meatoscopia/editar/' + id, event);
      dispatch(meatoscopia.actions.editar(response.data));
      console.log('sucesso: update meatoscopia');
    } catch (error) {
      dispatch(meatoscopia.actions.hasError(error));
      console.log('erro: update meatoscopia');
    }
  };
}

export function excluir(event) {
  return async (dispatch) => {
    dispatch(meatoscopia.actions.loading());
    try {
      await axios.put('/meatoscopia/', event);
      dispatch(meatoscopia.actions.excluir(response.data));
      console.log('sucesso: delete meatoscopia');
    } catch (error) {
      dispatch(meatoscopia.actions.hasError(error));
      console.log('erro: delete meatoscopia');
    }
  };
}

export function novo(newEvent) {
  return async () => {
    dispatch(meatoscopia.actions.loading());
    try {
      const response = await axios.post('/meatoscopia', newEvent);
      dispatch(meatoscopia.actions.novo(response.data));
    } catch (error) {
      dispatch(meatoscopia.actions.hasError(error));
    }
  };
}

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

const preAutoDeclaracao = createSlice({
  name: 'preAutoDeclaracao',
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

    // create event
    aprovar(state, action) {
      state.isLoader = false;
      state.isModalOpen = false;
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

export default preAutoDeclaracao.reducer;

export const { data, isLoader, toggleModal } = preAutoDeclaracao.actions;

export function getAll() {
  return async () => {
    dispatch(preAutoDeclaracao.actions.loading());
    try {
      const response = await axios.get('/pre_auto_declaracao');
      console.log('pre_auto_declaracao', response.data);
      dispatch(
        preAutoDeclaracao.actions.setAll(
          response.data.map(
            ({
              id_pre_auto_declaracao,
              ds_pre_auto_declaracao,
              dt_pre_auto_declaracao,
              plano_saude,
              escola,
              nr_carteirinha,
              cs_dor_ouvido,
              cs_dif_fala,
              cs_dif_fala_em_terapia,
              cs_dif_fala_ja_fez_terapia,
              cs_aprendizagem_baixo_rend,
              cs_aprendizagem_desatento,
              cs_aprendizagem_agitado,
              cs_usa_chupeta,
              cs_usa_dedo,
              cs_usa_mamadeira,
              cs_autorizo_uso_fotos,
              // cs_autorizo_assinatura_link,
              cs_autorizo_assinatura_resp,
              cs_serie,
              cs_turma,
              cs_turno,
              cs_autorizo,
              st_ativo,
              nm_paciente,
              nr_cpf,
              cs_genero,
              dt_nascimento,
              nm_responsavel,
              nr_telefone,
              nm_email
            }) => ({
              ID: id_pre_auto_declaracao,
              ds_pre_auto_declaracao: ds_pre_auto_declaracao,
              dt_pre_auto_declaracao: dt_pre_auto_declaracao === null ? null : new Date(dt_pre_auto_declaracao).toISOString().split('T')[0],
              id_escola: escola.id_escola,
              escola: escola,
              id_plano_saude: plano_saude.id_plano_saude,
              plano_saude: plano_saude,
              nr_carteirinha: nr_carteirinha,
              cs_dor_ouvido: cs_dor_ouvido,
              cs_dif_fala: cs_dif_fala,
              cs_dif_fala_em_terapia: cs_dif_fala_em_terapia,
              cs_dif_fala_ja_fez_terapia: cs_dif_fala_ja_fez_terapia,
              cs_aprendizagem_baixo_rend: cs_aprendizagem_baixo_rend,
              cs_aprendizagem_desatento: cs_aprendizagem_desatento,
              cs_aprendizagem_agitado: cs_aprendizagem_agitado,
              cs_usa_chupeta: cs_usa_chupeta,
              cs_usa_dedo: cs_usa_dedo,
              cs_usa_mamadeira: cs_usa_mamadeira,
              cs_autorizo_uso_fotos: cs_autorizo_uso_fotos,
              // cs_autorizo_assinatura_link: cs_autorizo_assinatura_link,
              cs_autorizo_assinatura_resp: cs_autorizo_assinatura_resp,
              cs_serie: cs_serie,
              cs_turma: cs_turma,
              cs_turno: cs_turno,
              cs_autorizo: cs_autorizo,
              st_ativo: st_ativo,
              nm_paciente,
              nr_cpf,
              cs_genero,
              dt_nascimento,
              nm_responsavel,
              nr_telefone,
              nm_email
            })
          )
        )
      );
    } catch (error) {
      dispatch(preAutoDeclaracao.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(preAutoDeclaracao.actions.loading());
    try {
      const response = await axios.get('/pre_auto_declaracao/editar/' + id);

      const edit = {
        id_pre_auto_declaracao: response.data.id_pre_auto_declaracao,
        ds_pre_auto_declaracao: response.data.ds_pre_auto_declaracao,
        dt_pre_auto_declaracao: response.data.dt_pre_auto_declaracao
          ? new Date(response.data.dt_pre_auto_declaracao).toISOString().split('T')[0]
          : '',
        // dt_pre_auto_declaracao: response.data.dt_pre_auto_declaracao,
        id_escola: response.data.escola.id_escola,
        escola: response.data.escola,
        id_plano_saude: response.data.plano_saude.id_plano_saude,
        plano_saude: response.data.plano_saude,
        nr_carteirinha: response.data.nr_carteirinha,
        cs_dor_ouvido: response.data.cs_dor_ouvido,
        cs_dif_fala: response.data.cs_dif_fala,
        cs_dif_fala_em_terapia: response.data.cs_dif_fala_em_terapia,
        cs_dif_fala_ja_fez_terapia: response.data.cs_dif_fala_ja_fez_terapia,
        cs_aprendizagem_baixo_rend: response.data.cs_aprendizagem_baixo_rend,
        cs_aprendizagem_desatento: response.data.cs_aprendizagem_desatento,
        cs_aprendizagem_agitado: response.data.cs_aprendizagem_agitado,
        cs_usa_chupeta: response.data.cs_usa_chupeta,
        cs_usa_dedo: response.data.cs_usa_dedo,
        cs_usa_mamadeira: response.data.cs_usa_mamadeira,
        cs_autorizo_uso_fotos: response.data.cs_autorizo_uso_fotos,
        // cs_autorizo_assinatura_link: response.data.cs_autorizo_assinatura_link,
        cs_autorizo_assinatura_resp: response.data.cs_autorizo_assinatura_resp,
        cs_serie: response.data.cs_serie,
        cs_turma: response.data.cs_turma,
        cs_turno: response.data.cs_turno,
        cs_autorizo: response.data.cs_autorizo,
        st_ativo: response.data.st_ativo,
        nm_paciente: response.data.nm_paciente,
        nr_cpf: response.data.nr_cpf,
        cs_genero: response.data.cs_genero,
        // dt_nascimento: response.data.dt_nascimento,
        dt_nascimento: response.data.dt_nascimento ? new Date(response.data.dt_nascimento).toISOString().split('T')[0] : '',

        nm_responsavel: response.data.nm_responsavel,
        nr_telefone: response.data.nr_telefone,
        nm_email: response.data.nm_email,
        ds_caminho_carteirinha: response.data.ds_caminho_carteirinha
      };
      if (edit) {
        dispatch(preAutoDeclaracao.actions.setId(edit));
      }
    } catch (error) {
      dispatch(preAutoDeclaracao.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(preAutoDeclaracao.actions.loading());
    try {
      const response = await axios.put('/pre_auto_declaracao/editar/' + id, event);
      dispatch(preAutoDeclaracao.actions.editar(response.data));
      console.log('sucesso: update auto declaracao');
    } catch (error) {
      dispatch(preAutoDeclaracao.actions.hasError(error));
      console.log('erro: update auto declaracao');
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(preAutoDeclaracao.actions.loading());
    try {
      const response = await axios.put('/pre_auto_declaracao', event);
      dispatch(preAutoDeclaracao.actions.excluir(response.data));
      console.log('sucesso: delete auto declaracao');
    } catch (error) {
      dispatch(preAutoDeclaracao.actions.hasError(error));
      console.log('erro: delete auto declaracao');
    }
  };
}

export function novo(formData) {
  return async () => {
    dispatch(preAutoDeclaracao.actions.loading());
    try {
      const response = await axios.post('/pre_auto_declaracao', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
      });

      dispatch(preAutoDeclaracao.actions.novo(response.data));
      return response.data;
    } catch (error) {
      dispatch(preAutoDeclaracao.actions.hasError(error));
      console.log('erro: delete auto declaracao');
      return error;
    }
  };
}

export function duplicar(event) {
  return async () => {
    dispatch(preAutoDeclaracao.actions.loading());
    try {
      const response = await axios.post('/pre_auto_declaracao/duplicar', event);
      dispatch(preAutoDeclaracao.actions.aprovar(response.data));
      console.log('sucesso: update auto declaracao');
    } catch (error) {
      dispatch(preAutoDeclaracao.actions.hasError(error));
      throw error; // Lança o erro para ser capturado na tela
    }
  };
}

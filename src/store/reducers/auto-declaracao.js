import { createSlice } from '@reduxjs/toolkit';

// project import
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
  error: false,
  data: [],
  pacientes: [],
  isLoader: false,
  isModalOpen: false,
  selectedId: null
};

// ==============================|| PLANO SAUDE ||============================== //

const autoDeclaracao = createSlice({
  name: 'autoDeclaracao',
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
    setPacientes(state, action) {
      state.isLoader = false;
      state.pacientes = action.payload;
    },

    // event list
    setAlunosPorEscola(state, action) {
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

    // update event
    alterarStatus(state, action) {
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

export default autoDeclaracao.reducer;

export const { toggleModal } = autoDeclaracao.actions;

export function getAll() {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.get('/auto_declaracao');
      dispatch(
        autoDeclaracao.actions.setAll(
          response.data.map(
            ({
              id_auto_declaracao,
              ds_auto_declaracao,
              dt_auto_declaracao,
              plano_saude,
              paciente,
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
              st_ativo
            }) => ({
              ID: id_auto_declaracao,
              ds_auto_declaracao: ds_auto_declaracao,
              dt_auto_declaracao: dt_auto_declaracao === null ? null : new Date(dt_auto_declaracao).toISOString().split('T')[0],
              id_paciente: paciente.id_paciente,
              paciente: paciente,
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
              st_ativo: st_ativo
            })
          )
        )
      );
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

export function getPacientes() {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.get('/auto_declaracao/paciente');
      dispatch(
        autoDeclaracao.actions.setPacientes(
          response.data.map(({ id_auto_declaracao, cs_serie, cs_turma, cs_turno, paciente }) => ({
            id_auto_declaracao: id_auto_declaracao,
            id_paciente: paciente.id_paciente,
            nm_paciente: paciente.nm_paciente,
            cs_serie: cs_serie,
            cs_turma: cs_turma,
            cs_turno: cs_turno
          }))
        )
      );
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

export function getId(id) {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.get('/auto_declaracao/editar/' + id);

      const edit = {
        id_auto_declaracao: response.data.id_auto_declaracao,
        ds_auto_declaracao: response.data.ds_auto_declaracao,
        dt_auto_declaracao: response.data.dt_auto_declaracao ? new Date(response.data.dt_auto_declaracao).toISOString().split('T')[0] : '',
        id_paciente: response.data.paciente.id_paciente,
        paciente: response.data.paciente,
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
        ds_caminho_carteirinha: response.data.ds_caminho_carteirinha,
        ds_caminho_documento: response.data.ds_caminho_documento,
        st_ativo: response.data.st_ativo
      };
      if (edit) {
        dispatch(autoDeclaracao.actions.setId(edit));
      }
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

export function editar(id, event) {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.put('/auto_declaracao/editar/' + id, event);
      dispatch(autoDeclaracao.actions.editar(response.data));
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

export function excluir(event) {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.put('/auto_declaracao/', event);
      dispatch(autoDeclaracao.actions.excluir([response.data]));
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

export function novo(formData) {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      console.log('formData', formData);
      const response = await axios.post('/auto_declaracao', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
      });

      dispatch(autoDeclaracao.actions.novo(response.data));
      return response.data;
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
      return error;
    }
  };
}

export function alterarStatus(id) {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.put('/auto_declaracao/status/' + id);
      dispatch(autoDeclaracao.actions.alterarStatus(response.data));
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

export function getAlunosPorEscola(ano) {
  return async () => {
    dispatch(autoDeclaracao.actions.loading());
    try {
      const response = await axios.get('/auto_declaracao/alunos_por_escola/' + ano);
      dispatch(autoDeclaracao.actions.setAlunosPorEscola(response.data));
    } catch (error) {
      dispatch(autoDeclaracao.actions.hasError(error));
    }
  };
}

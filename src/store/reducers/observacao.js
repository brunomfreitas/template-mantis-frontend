import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios from 'utils/api';

const initialState = {
    error: false,
    observacoes: [],
    isLoader: false,
    isModalOpen: false,
    selectedObservacaoId: null
};

// ==============================|| PLANO SAUDE ||============================== //

const observacoes = createSlice({
    name: 'observacoes',
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
        setObs(state, action) {
            state.isLoader = false;
            state.observacoes = action.payload;
        },

        // event list
        setObsId(state, action) {
            state.isLoader = false;
            state.observacoes = action.payload;
        },

        // select event
        selectobservacao(state, action) {
            const eventId = action.payload;
            state.isModalOpen = true;
            state.selectedObservacaoId = eventId;
        },

        // create event
        novo(state, action) {
            state.isLoader = false;
            state.isModalOpen = false;
            state.observacoes = action.payload;
        },

        // update event
        editar(state, action) {
            state.isLoader = false;
            state.isModalOpen = false;
            state.selectedObservacaoId = null;
            state.observacoes = action.payload;
        },

        // delete event
        excluir(state, action) {
            state.isLoader = false;
            state.observacoes = action.payload;
        },

        // modal toggle
        toggleModal(state) {
            state.isModalOpen = !state.isModalOpen;
            if (state.isModalOpen === false) {
                state.selectedObservacaoId = null;
                state.selectedRange = null;
            }
        }
    }
});

export default observacoes.reducer;

export const { selectobservacao, toggleModal } = observacoes.actions;

export function getObservacao() {
    return async (dispatch) => {
        dispatch(observacoes.actions.loading());
        try {
            const response = await axios.get('/observacao');

            const options = response.data.map(({ id_observacao, ds_observacao, nm_observacao, prontuario_observacao, st_ativo }) => ({
                ID: id_observacao,
                ds_observacao: ds_observacao,
                nm_observacao: nm_observacao,
                prontuario_observacao: prontuario_observacao,
                st_ativo: st_ativo
            }));

            // Mapeie as opções diretamente aqui e retorne para utilização posterior
            const mappedOptions = options.map((observacao) => observacao.nm_observacao || observacao.ds_observacao);

            dispatch(observacoes.actions.setObs(options));

            return {
                options: mappedOptions, // Retorna as opções mapeadas
                data: options // Retorna os dados originais
            };
        } catch (error) {
            dispatch(observacoes.actions.hasError(error));
            return { options: [], data: [] }; // Ou qualquer valor padrão que você deseja retornar em caso de erro
        }
    };
}

export function getIdObs(id) {
    return async () => {
        dispatch(observacoes.actions.loading());
        try {
            const response = await axios.get('/observacao/visualizar/' + id);

            console.log('editar - response.data', response.data);

            const edit = {
                id_observacao: response.data.id_observacao,
                ds_observacao: response.data.ds_observacao,
                nm_observacao: response.data.nm_observacao,
                st_ativo: response.data.st_ativo
            };

            if (edit) {
                console.log('editar', edit);
                dispatch(observacoes.actions.setIdObs(edit));
            }
        } catch (error) {
            dispatch(observacoes.actions.hasError(error));
        }
    };
}

export function editarObs(id, event) {
    return async () => {
        dispatch(observacoes.actions.loading());
        try {
            const response = await axios.put('/observacao/editar/' + id, event);
            dispatch(observacoes.actions.editar(response.data));
            console.log('sucesso: update auto declaracao', response.data);
        } catch (error) {
            dispatch(observacoes.actions.hasError(error));
            console.log('erro: update auto declaracao');
        }
    };
}

export function excluirObs(event) {
    return async (dispatch) => {
        dispatch(observacoes.actions.loading());
        try {
            await axios.put('/observacao/', event);
            console.log('sucesso: delete auto declaracao');
        } catch (error) {
            dispatch(observacoes.actions.hasError(error));
            console.log('erro: delete auto declaracao');
        }
    };
}

export function novoObs(newEvent) {
    return async () => {
        dispatch(observacoes.actions.loading());
        try {
            const response = await axios.post('/observacao', newEvent);
            dispatch(observacoes.actions.novo(response.data));
        } catch (error) {
            dispatch(observacoes.actions.hasError(error));
        }
    };
}

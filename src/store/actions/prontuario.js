import { prontuarioSlice } from 'store/reducers/prontuario';
import axios from 'utils/api';
import { createEntityActions } from './genericActions';

const genericActions = createEntityActions(prontuarioSlice, 'prontuario');

export const prontuarioActions = {
    ...genericActions,

    importarExcel: (file) => async () => {
        const formData = new FormData();

        formData.append('file', file);

        const response = await axios.post('/prontuario/importar-excel', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    },

    baixarTemplateExcel: () => async () => {
        const response = await axios.get('/prontuario/template-excel', {
            responseType: 'blob'
        });

        return response.data;
    }
};

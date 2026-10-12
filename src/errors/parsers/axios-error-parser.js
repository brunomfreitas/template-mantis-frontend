import { apiErrorParser } from './api-error-parser';

export const axiosErrorParser = (error, fieldLabels, errorMessages) => {
    const response = error?.response?.data;

    const parsed = apiErrorParser(response, fieldLabels, errorMessages);

    if (parsed) {
        return parsed;
    }

    switch (error?.response?.status) {
        case 401:
            return 'Sessão expirada';

        case 403:
            return 'Acesso negado';

        case 404:
            return 'Registro não encontrado';

        case 500:
            return 'Erro interno do servidor';

        default:
            return error?.message || 'Erro inesperado';
    }
};

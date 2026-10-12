export const getErrorMessage = (error, validationMessages = {}) => {
    const response = error?.response?.data;

    console.log('response', response);

    if (Array.isArray(response?.message)) {
        return response.message
            .map((e) => {
                return validationMessages[e.field] || e.message;
            })
            .join(', ');
    }

    return response?.message || error?.message || 'Erro interno do servidor';
};

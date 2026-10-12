export const apiErrorParser = (response, fieldLabels, errorMessages) => {
    if (!Array.isArray(response?.errors)) {
        return null;
    }

    return response.errors
        .map((error) => {
            const field = fieldLabels[error.field] || '';

            const message = errorMessages[error.code] || error.code;

            return field ? `${field} ${message}` : message;
        })
        .join(', ');
};

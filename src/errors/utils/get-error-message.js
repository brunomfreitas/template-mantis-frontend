import { axiosErrorParser } from '../parsers/axios-error-parser';

export const getErrorMessage = (error, fieldLabels, errorMessages) => {
    return axiosErrorParser(error, fieldLabels, errorMessages);
};

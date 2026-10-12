import { ERROR_CODES } from '../constants/error-codes';

export const getErrorMessagesMap = (intl) => ({
    [ERROR_CODES.REQUIRED_FIELD]: intl.formatMessage({
        id: 'isRequired'
    }),

    [ERROR_CODES.INVALID_DATE]: intl.formatMessage({
        id: 'invalidDate'
    }),

    [ERROR_CODES.INVALID_EMAIL]: intl.formatMessage({
        id: 'invalidEmail'
    }),

    [ERROR_CODES.RECORD_NOT_FOUND]: intl.formatMessage({
        id: 'recordNotFound'
    }),

    [ERROR_CODES.DUPLICATE_RECORD]: intl.formatMessage({
        id: 'duplicateRecord'
    }),

    [ERROR_CODES.ACCESS_DENIED]: intl.formatMessage({
        id: 'accessDenied'
    }),

    [ERROR_CODES.INTERNAL_SERVER_ERROR]: intl.formatMessage({
        id: 'internalServerError'
    })
});

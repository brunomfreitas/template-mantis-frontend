import { useIntl } from 'react-intl';

import { getFieldLabelsMap } from '../maps/field-labels.map';

import { getErrorMessagesMap } from '../maps/error-messages.map';

import { getErrorMessage } from '../utils/get-error-message';

export const useErrorHandler = () => {
    const intl = useIntl();

    const fieldLabels = getFieldLabelsMap(intl);

    const errorMessages = getErrorMessagesMap(intl);

    const parseError = (error) => {
        return getErrorMessage(error, fieldLabels, errorMessages);
    };

    return {
        parseError
    };
};

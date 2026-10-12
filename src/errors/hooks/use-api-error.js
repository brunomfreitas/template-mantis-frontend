import { useDispatch } from 'react-redux';

import { openSnackbar } from 'store/reducers/snackbar';

import { useErrorHandler } from './use-error-handler';

export const useApiError = () => {
    const dispatch = useDispatch();

    const { parseError } = useErrorHandler();

    const handleApiError = (error) => {
        dispatch(
            openSnackbar({
                open: true,

                message: parseError(error),

                variant: 'alert',

                alert: {
                    color: 'error'
                }
            })
        );
    };

    return {
        handleApiError
    };
};

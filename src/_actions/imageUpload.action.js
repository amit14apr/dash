import { articleConstants } from '../_constants';
import { imageUploadService } from '../_services';
import { alertActions } from '.';
import { history, autoLogOut } from '../_helpers';
export const imageUploadAction = {
    UploadImageArticle,
    commonProps,
};

function UploadImageArticle(formData, sku) {
    return dispatch => {
        dispatch(request(true));
        imageUploadService.UploadImageArticle(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                    } else {
                       dispatch(alertActions.success(data.message.toString())); 
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_FIELDS_FROM_SKUTYPE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_FIELDS_FROM_SKUTYPE_ERROR, error } }
}

function commonProps(data) {
    return dispatch => {
        dispatch(success(data));
        function success(data) { return { type: articleConstants.COMMON_PROPS, data } }
    }
}

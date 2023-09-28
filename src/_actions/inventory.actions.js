import { inventoryConstants } from '../_constants';
import { inventoryService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const inventoryActions = {
createWarehouse,
createInventory,
listWarehouse,
updateWarehouse,
commonProps,
};
function createWarehouse(formData) {
    return dispatch => {
        dispatch(request(true));
        inventoryService.createWarehouse(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else {
                        dispatch(success(data));
                        dispatch(alertActions.success(`Warehouse ${data.code} Created successfully`));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: inventoryConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: inventoryConstants.CREATE_WAREHOUSE_SUCCESS, data } }
    function failure(error) { return { type: inventoryConstants.CREATE_WAREHOUSE_FAILURE, error } }
}

function listWarehouse(formData) {
    return dispatch => {
        dispatch(request(true));
        inventoryService.listWarehouse(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else {
                        dispatch(success(data));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: inventoryConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: inventoryConstants.LIST_WAREHOUSE_SUCCESS, data } }
    function failure(error) { return { type: inventoryConstants.LIST_WAREHOUSE_ERROR, error } }
}


function updateWarehouse(formData) {
return dispatch => {
    dispatch(request(true));
    inventoryService.updateWarehouse(formData)
        .then(
            data => {
                dispatch(request(false));
                if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                    dispatch(alertActions.error(data.message.toString()));
                } else {
                    dispatch(alertActions.success(`Warehouse ${data.code} Updated successfully`));
                }
            },
            error => {
                dispatch(request(false));
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
};

function request(boolean) { return { type: inventoryConstants.LOADING_REQUEST, boolean } }
function failure(error) { return { type: inventoryConstants.UPDATE_WAREHOUSE_FAILURE, error } }
}

function createInventory(formData) {
    return dispatch => {
        dispatch(request(true));
        inventoryService.createInventory(formData)
            .then(
                data => {
                    dispatch(request(false));
                    dispatch(success(data));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else {
                        dispatch(success(data));
                        dispatch(alertActions.success(`Inventory for ${data.grn} Created successfully`));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: inventoryConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: inventoryConstants.CREATE_INVENTORY_SUCCESS, data } }
    function failure(error) { return { type: inventoryConstants.CREATE_INVENTORY_FAILURE, error } }
}

function commonProps(data) {
    return dispatch => {
        dispatch(success(data));
        function success(data) { return { type: inventoryConstants.COMMON_PROPS, data } }
    }
}

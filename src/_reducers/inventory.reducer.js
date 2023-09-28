import { inventoryConstants } from '../_constants';

export function inventory(state = {}, action) {
    switch (action.type) {
        case inventoryConstants.CREATE_WAREHOUSE_SUCCESS:
            return { warehouseCreated: true };
        case inventoryConstants.CREATE_WAREHOUSE_FAILURE:
            return { warehouseCreated: false };
        case inventoryConstants.CREATE_INVENTORY_SUCCESS:
            return { inventoryCreated: true };
        case inventoryConstants.CREATE_WAREHOUSE_FAILURE:
            return { inventoryCreated: false };
        case inventoryConstants.LIST_WAREHOUSE_SUCCESS:
            return { listWarehouse: action.data };
        default:
            return state
    }
}
import { inventoryConstants } from '../_constants';

const initialState = {propsData : []};

export function commonProps(state = initialState, action) {
    switch (action.type) {
        case inventoryConstants.COMMON_PROPS:
            return {
                propsData: action.data
            };
        default:
            return state
    }
}
import { userConstants } from '../_constants';

export function loading(state = {}, action) {
    switch (action.type) {
        case userConstants.LOADING_REQUEST:
            return {
                isLoading: action.boolean
            };
        default:
            return state
    }
}
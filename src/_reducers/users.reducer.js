import { userConstants } from '../_constants';
const initialState = {roles :[],rolesList:[]}
export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.FORGOT_PASSWORD_REQUEST:
            return { ...state,  ...state,  requstForgotPassword: true };
        case userConstants.FORGOT_PASSWORD_SUCCESS:
            return { ...state,  forgotPasswordSuccess: true };
        case userConstants.RESET_PASSWORD_SUCCESS:
            return { ...state,  resetPasswordSuccess: true };
        case userConstants.LOGOUT_SUCCESS:
            return { ...state,  logout: action.boolean };
        case userConstants.LOGOUT_FAILURE:
            return { ...state,  logout: action.error };    
        case userConstants.USER_ROLES_SUCCESS:
            return { ...state,  roles: action.data }; 
            case userConstants.USER_ROLES_LIST_SUCCESS:
                return { ...state, rolesList: action.data }; 
             
        case userConstants.USER_DEPARTMENTS_SUCCESS:
                return { ...state,  departments: action.data };      
        case userConstants.USER_ROLES_FAILURE:
            return { ...state,  roles: action.error};                 
        default:
            return state
    }
}
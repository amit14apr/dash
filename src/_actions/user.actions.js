import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { history, autoLogOut } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    forgotpassword,
    resetpassword,
    getUserRoles,
    getUserList,
    getUserRolesList,
    getDepartments
};

function login(username, password, from) {
    return dispatch => {
        // dispatch(request(true));
        // userService.login(username, password)
            // .then(
            //     user => {
            //         dispatch(request(false));
            //         if (user.httpStatusCode == 404 || user.httpStatusCode == 401) {
            //             dispatch(alertActions.error(user.message.toString()));
            //         } else {
            //             dispatch(success(user));
            //             history.push('/');
            //         }
            //     },
            //     error => {
            //         dispatch(request(false)),
            //             dispatch(failure(error.toString()));
            //         dispatch(alertActions.error(error.toString()));
            //     }
            // );
           let user = JSON.parse(localStorage.getItem('user'));
           if(user?.email === username){
            dispatch(success(user));
            history.push('/');
           }
           else{
            dispatch(request(false)),
               // dispatch(failure("No User Found"));
                dispatch(alertActions.error("No User Found"));
           }
            
    };

    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        //dispatch(request(true));
        localStorage.removeItem('user')
        history.push('/');
        // userService.logout()
        //     .then(
        //         user => {
        //             dispatch(request(false));
        //                //
        //                 document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //                 history.push('/');
        //                 dispatch(alertActions.success('Logout successful'));
        //         },
        //         error => {
        //             dispatch(request(false));
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };
    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(boolean) { return { type: userConstants.LOGOUT_SUCCESS, boolean } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}

function register(user) {
    return dispatch => {
        dispatch(request(true));
        userService.register(user)
        dispatch(alertActions.success('Registration successful'));
        dispatch(request(false));
            // .then(
            //     data => {
            //         dispatch(request(false));
            //         if (data.httpStatusCode == 208) {
            //             dispatch(alertActions.error(data.message.toString()));
            //         } else {
            //             dispatch(success(data));
            //             dispatch(alertActions.success('Registration successful'));
            //         }
            //     },
            //     error => {
            //         dispatch(request(false));
            //         dispatch(failure(error.toString()));
            //         dispatch(alertActions.error(error.toString()));
            //     }
            // );
    };

    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: userConstants.REGISTER_SUCCESS, data } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function forgotpassword(email) {
    return dispatch => {
        dispatch(request(true));
        userService.forgotpassword(email)
            .then(
                user => {
                    dispatch(request(false));
                    if (user.httpStatusCode == 404 || user.httpStatusCode == 400 || user.httpStatusCode == 504) {
                        dispatch(alertActions.error(user.message.toString()));
                        return;
                    } else {
                        dispatch(success(email));
                        dispatch(alertActions.success('Forgot Password Successful'));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()))
                }
            );
    };

    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(users) { return { type: userConstants.FORGOT_PASSWORD_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FORGOT_PASSWORD_FAILURE, error } }
}

function resetpassword(id) {
    return dispatch => {
        dispatch(request(true));
        userService.resetpassword(id)
            .then(
                user => {
                    dispatch(request(false));
                    if (user.httpStatusCode == 404 || user.httpStatusCode == 400 || user.httpStatusCode == 504) {
                        dispatch(alertActions.error(user.message.toString()));
                        return;
                    } else {
                        dispatch(success(user));
                        dispatch(alertActions.success('Reset Password Successful'));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()))
                }
            );
    };
    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: userConstants.USER_ROLES_SUCCESS, data } }
    function failure(error) { return { type: userConstants.USER_ROLES_FAILURE, error } }
}

    function getUserList(formData) {
        return dispatch => {
            dispatch(request(true));
            userService.getUserList(formData)
                .then(
                    data => {
                        dispatch(request(false));
                        if (data.httpStatusCode == 404 || data.httpStatusCode == 400 || data.httpStatusCode == 500) {
                            dispatch(alertActions.error(data.message.toString()));
                            return;
                        } else {
                            dispatch(success(data));
                           
                        }
                    },
                    error => {
                        dispatch(request(false));
                        dispatch(failure(error.toString()))
                    }
                );
        };

    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: userConstants.LIST_USER_SUCCESS, data } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function getUserRoles() {
    return dispatch => {
        dispatch(request(true));
        userService.getUserRoles()
            .then(
                user => {
                    dispatch(request(false));
                    if (user.httpStatusCode == 404 || user.httpStatusCode == 401 || user.httpStatusCode == 403) {
                        autoLogOut();
                        dispatch(alertActions.error(user.message.toString())); 
                    } else {
                        dispatch(success(user));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: userConstants.USER_ROLES_SUCCESS, data } }
    function failure(error) { return { type: userConstants.USER_ROLES_FAILURE, error } }
}

function getUserRolesList() {
    return dispatch => {
        dispatch(request(true));
        userService.getUserRolesList()
            .then(
                user => {
                    dispatch(request(false));
                    if (user.httpStatusCode == 404 || user.httpStatusCode == 401 || user.httpStatusCode == 403) {
                        autoLogOut();
                        dispatch(alertActions.error(user.message.toString())); 
                    } else {
                        dispatch(success(user));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: userConstants.USER_ROLES_LIST_SUCCESS, data } }
    function failure(error) { return { type: userConstants.USER_ROLES_FAILURE, error } }
}


function getDepartments() {
    return dispatch => {
        dispatch(request(true));
        userService.getDepartments()
            .then(
                user => {
                    dispatch(request(false));
                    if (user.httpStatusCode == 404 || user.httpStatusCode == 401 || user.httpStatusCode == 403) {
                        autoLogOut();
                        dispatch(alertActions.error(user.message.toString())); 
                    } else {
                        dispatch(success(user));
                    }
                },
                error => {
                    dispatch(request(false));
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(boolean) { return { type: userConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: userConstants.USER_DEPARTMENTS_SUCCESS, data } }
    function failure(error) { return { type: userConstants.USER_ROLES_FAILURE, error } }
}
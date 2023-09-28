import appConfig from '../_appConfig/_appConfig';
import { authToken } from '../_helpers';

export const userService = {
    login,
    register,
    forgotpassword,
    resetpassword,
    logout, 
    getUserRoles,
    getUserList,
    getUserRolesList,
    getDepartments
};
const country = localStorage.getItem("Lang") || "en";
const token = localStorage.getItem("user");
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    // return fetch(`${appConfig.userService.apiDomain}/users/login`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //        if(user.token) {
    //         document.cookie = "user=" + user.token + ";secure; path=/ ";
    //          //localStorage.setItem('user', user.token);
    //          localStorage.getItem("user")
    //        }
           let user =  localStorage.getItem("users")
            return user;
        // });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
        localStorage.setItem("user",JSON.stringify(user))
    // return fetch(`${appConfig.userService.apiDomain}/users/register`, requestOptions).then(handleResponse);
    return JSON.stringify(user)
}

function forgotpassword(userEmail) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userEmail})
    };

    return fetch(`${appConfig.userService.apiDomain}/users/forgotPassword`, requestOptions).then(handleResponse);
}
function resetpassword(newPassword) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
        body: JSON.stringify({newPassword})
    };

    return fetch(`${appConfig.userService.apiDomain}/users/resetPassword/${window.location.search}`, requestOptions).then(handleResponse);
}

function logout() {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({...authToken()})
    };

    return fetch(`${appConfig.userService.apiDomain}/users/logOut`, requestOptions).then(handleResponse);

}

function getUserRoles() {
    const requestOptions = {
        method: 'PUT',
        headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken().token 
                },
        body: JSON.stringify({...authToken()})
    };

    return fetch(`${appConfig.userService.apiDomain}/users/roles/permissions`, requestOptions).then(handleResponse);

}

function getUserRolesList() {
    const requestOptions = {
        method: 'GET',
        headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken().token 
                }
       
    };

    return fetch(`${appConfig.userService.apiDomain}/users/roles/`, requestOptions).then(handleResponse);

}

function getDepartments() {
    const requestOptions = {
        method: 'GET',
        headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken().token 
                }
       
    };

    return fetch(`${appConfig.userService.apiDomain}/users/departments`, requestOptions).then(handleResponse);

}

function getUserList(formData) {
    const requestOptions = {
        method: 'GET',
        headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken().token 
                }
    };
    if(formData === undefined )
    formData = "";
    return fetch(`${appConfig.userService.apiDomain}/users/getAllUser${formData}`, requestOptions).then(handleResponse);

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.description) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
import _appConfig from '../_appConfig/_appConfig';
import { authToken } from '../_helpers';
import { alertActions } from '../_actions/alert.actions';
import { history } from '../_helpers';
import appConfig from '../_appConfig/_appConfig';

export const imageUploadService = {
    UploadImageArticle,
};
    function UploadImageArticle(formData, sku) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken().token  
            },
            body: formData
        };
        return fetch(`${appConfig.configService.apiDomain}/articles/image/upload`, requestOptions).then(handleResponse);
    }


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
       
        if (!response.ok) {
           
            if (response.status === 401 ) {
                // auto logout if 401 response returned from api
              //  logout();
                //location.reload(true);
            }

            const error = (data && data.description) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
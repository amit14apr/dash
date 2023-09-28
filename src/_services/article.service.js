import _appConfig from '../_appConfig/_appConfig';
import { authToken } from '../_helpers';
import { alertActions } from '../_actions/alert.actions';
import { history } from '../_helpers';
import appConfig from '../_appConfig/_appConfig';

export const articleService = {
    listArticle,
    getFieldsFromSKUType,
    createArticle,
    exportArticles,
    getMarketListForLocaliseArticle,
    getAcccessories,
    getArticleBySKU,
    localiseArticle,
    createAccessoriesMapping,
    articleSystemConfiguration,
    getArticleSystemConfiguration,
    getMappedAccessoriesBySKU,
    createSuggestedRetailPrice,
    getSuggestedRetailPrice,
};

function listArticle(formData) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
    };
    return fetch(`${appConfig.articleService.apiDomain}/articles/${formData}`, requestOptions).then(handleResponse);
}

function exportArticles() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/csv',
            'Authorization': 'Bearer ' + authToken().token  
        },
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/exports/exportCSVFile`, requestOptions).then(handleExportResponse);
}

function getFieldsFromSKUType(formData) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
            'profile': appConfig.articleService.profile,
            'label':   appConfig.articleService.label,
        },
    };

    return fetch(`${appConfig.configService.apiDomain}/configs/applicationConfig?profile=${appConfig.articleService.profile}&label=${appConfig.articleService.label}&key=${formData}`, requestOptions).then(handleResponse);
}

function createArticle(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/`, requestOptions).then(handleResponse);
}

function localiseArticle(id,formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/${id}`, requestOptions).then(handleResponse);
}

function getMarketListForLocaliseArticle() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
            'profile': appConfig.articleService.profile,
            'label':   appConfig.articleService.label,
        },
    };

    return fetch(`${appConfig.configService.apiDomain}/configs/applicationConfig?profile=${appConfig.articleService.profile}&label=${appConfig.articleService.label}&key=articleMarketsList`, requestOptions).then(handleResponse);
}
function getAcccessories(textVal) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
        },
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/?filterFields=search&filterValues=${textVal}`, requestOptions).then(handleResponse);
}
function getArticleBySKU(SKU) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
        },
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/?filterFields=search&filterValues=${SKU}`, requestOptions).then(handleResponse);
}

function createAccessoriesMapping(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/accessoryMapping`, requestOptions).then(handleResponse);
}
function getMappedAccessoriesBySKU(SKU) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
        },
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/accessoryMapping/?filterFields=sku&filterValues=${SKU}`, requestOptions).then(handleResponse);
}
function articleSystemConfiguration(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/systemConfiguration`, requestOptions).then(handleResponse);
}

function getArticleSystemConfiguration(SKU) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
        },
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/systemConfiguration/?sku=${SKU}`, requestOptions).then(handleResponse);
}

function createSuggestedRetailPrice(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token  
        },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/suggestedRetailPrice`, requestOptions).then(handleResponse);
}
function getSuggestedRetailPrice(SKU) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken().token,
        },
    };

    return fetch(`${appConfig.articleService.apiDomain}/articles/suggestedRetailPrice/?filterFields=sku&filterValues=${SKU}`, requestOptions).then(handleResponse);
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
function handleExportResponse(response) {
    return response.text().then(text => {
        let json = null;
        try{
         json = JSON.parse(text);
        } catch(e){
            
        }
       
        if(response.status === 200 && json === null) {
            const data = text;
            const link = document.createElement("a");
                if (data == null) return;
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            let filename = `global_article_master_${date}.csv`;
                   
            link.setAttribute("href", 'data:text/csv;charset=utf-8,%EF%BB%BF'+encodeURIComponent(data));
            link.setAttribute("download", filename);
            link.click();

        } else if (response.status === 500) {
            const error = (data && data.description) || response.statusText;
            return Promise.reject(error);
         } else if ((json.httpStatusCode === 403) || (json.httpStatusCode === 401) ) {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            history.push('/');
        } 
        })
    }
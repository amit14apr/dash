import { articleConstants } from '../_constants';
import { articleService } from '../_services';
import { alertActions } from '.';
import { history, autoLogOut } from '../_helpers';
export const articleAction = {
listArticle,
getFieldsFromSKUType,
createArticle,
exportArticles,
getMarketListForLocaliseArticle,
getAcccessories,
getArticleBySKU,
localiseArticle,
commonProps,
createAccessoriesMapping,
articleSystemConfiguration,
getMappedAccessoriesBySKU,
createSuggestedRetailPrice,
getSuggestedRetailPrice,
getArticleSystemConfiguration,
};

function listArticle(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.listArticle(formData)
            .then(
                data => {
                    dispatch(request(false));
                    
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500 || 
                        data.httpStatusCode == 504) {
                        dispatch(alertActions.error(data.message.toString())); 
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.LIST_ARTICLE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.LIST_ARTICLE_ERROR, error } }
}
function getFieldsFromSKUType(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.getFieldsFromSKUType(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_FIELDS_FROM_SKUTYPE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_FIELDS_FROM_SKUTYPE_ERROR, error } }
}
function getMappedAccessoriesBySKU(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.getMappedAccessoriesBySKU(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_MAPPED_ACCESSORIES_FROM_SKUTYPE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_MAPPED_ACCESSORIES_FROM_SKUTYPE_ERROR, error } }
}
function createArticle(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.createArticle(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                    }else {
                        //dispatch(success(data));
                        dispatch(alertActions.success(`${data.sku} has been successfully created.`));
                    }
                },
                error => {
                    dispatch(request(false));
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
}

function localiseArticle(propData, formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.localiseArticle(propData.id, formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                    }else {
                        //dispatch(success(data));
                        dispatch(alertActions.success(`${propData.sku} has been successfully localised in the Hong Kong.`));
                    }
                },
                error => {
                    dispatch(request(false));
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
}

function exportArticles() {
    return dispatch => {
        dispatch(request(true));
        articleService.exportArticles()
            .then(
                data => {
                    dispatch(request(false));
                    dispatch(alertActions.success('Article Master export was successful! A file is downloaded at your system.'));
                }
                
            );
    };
    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
}
function getMarketListForLocaliseArticle() {
    return dispatch => {
        dispatch(request(true));
        articleService.getMarketListForLocaliseArticle() 
            .then(
                data => {
                    dispatch(request(false));
                    
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500 || 
                        data.httpStatusCode == 504) {
                        dispatch(alertActions.error(data.message.toString())); 
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                        return
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_MARKET_FIELDS_FOR_LOCALISE_ARTICLE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_MARKET_FIELDS_FOR_LOCALISE_ARTICLE_ERROR, error } }
}

function getAcccessories(textVal) { 
    return dispatch => {
        
        articleService.getAcccessories(textVal) 
            .then(
                data => {
                    dispatch(request(false));
                    
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500 || 
                        data.httpStatusCode == 504) {
                        dispatch(alertActions.error(data.message.toString())); 
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                        return
                    } else {
                        dispatch(success(data));
                    }
                },
                error => {
                  
                    dispatch(failure(error.toString()));
                    
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_ACCESSORIES_FIELDS_FOR_LOCALISE_ARTICLE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_ACCESSORIES_FIELDS_FOR_LOCALISE_ARTICLE_ERROR, error } }
}

function getArticleBySKU(SKU) {
    return dispatch => {
        dispatch(request(true));
        articleService.getArticleBySKU(SKU)
            .then(
                data => {
                    dispatch(request(false));
                    
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500 || 
                        data.httpStatusCode == 504) {
                        dispatch(alertActions.error(data.message.toString())); 
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.LIST_ARTICLE_BY_SKU_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.LIST_ARTICLE_BY_SKU_ERROR, error } }
}

function createAccessoriesMapping(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.createAccessoriesMapping(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                    }else {
                        //dispatch(success(data));
                        //dispatch(alertActions.success(`${propData.sku} has been successfully localised in the Hong Kong.`));
                    }
                },
                error => {
                    dispatch(request(false));
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
}


function articleSystemConfiguration(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.articleSystemConfiguration(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                    }else {
                        //dispatch(success(data));
                        //dispatch(alertActions.success(`${propData.sku} has been successfully localised in the Hong Kong.`));
                    }
                },
                error => {
                    dispatch(request(false));
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
}

function getArticleSystemConfiguration(SKU) {
    return dispatch => {
        dispatch(request(true));
        articleService.getArticleSystemConfiguration(SKU)
            .then(
                data => {
                    dispatch(request(false));
                    
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500 || 
                        data.httpStatusCode == 504) {
                      //  dispatch(alertActions.error(data.message.toString())); 
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_ARTICLE_SYSTEM_CONFIGURATION_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_ARTICLE_SYSTEM_CONFIGURATION_ERROR, error } }
}

function createSuggestedRetailPrice(formData) {
    return dispatch => {
        dispatch(request(true));
        articleService.createSuggestedRetailPrice(formData)
            .then(
                data => {
                    dispatch(request(false));
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500) {
                        dispatch(alertActions.error(data.message.toString()));
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
                        dispatch(alertActions.error(data.message.toString())); 
                    }else {
                        //dispatch(success(data));
                       // dispatch(alertActions.success(`${data.sku} has been successfully created.`));
                    }
                },
                error => {
                    dispatch(request(false));
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
}
function getSuggestedRetailPrice(SKU) {
    return dispatch => {
        dispatch(request(true));
        articleService.getSuggestedRetailPrice(SKU)
            .then(
                data => {
                    dispatch(request(false));
                    
                    if (data.httpStatusCode == 208 || data.httpStatusCode == 400 || data.httpStatusCode == 404 || data.httpStatusCode == 500 || 
                        data.httpStatusCode == 504) {
                        dispatch(alertActions.error(data.message.toString())); 
                    } else if (data.httpStatusCode == 403 || data.httpStatusCode == 401) {
                        autoLogOut();
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

    function request(boolean) { return { type: articleConstants.LOADING_REQUEST, boolean } }
    function success(data) { return { type: articleConstants.GET_SUGGESTED_RETAIL_PRICE_SUCCESS, data } }
    function failure(error) { return { type: articleConstants.GET_SUGGESTED_RETAIL_PRICE_ERROR, error } }
}

function commonProps(data) {
    return dispatch => {
        dispatch(success(data));
        function success(data) { return { type: articleConstants.COMMON_PROPS, data } }
    }
}

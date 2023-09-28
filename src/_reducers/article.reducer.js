import { Satellite } from '@material-ui/icons';
import { articleConstants, userConstants } from '../_constants';

const initialState = {listArticle : {},userslist:{}, ArticleFieldsOfSKUType: {}, MarketListForLocaliseArticle : {}, ArticleAccessories : [], listArticleBySKU : {} , listMappedAccessoriesBySKU : [], articleSystemConfigurationInfo : {}, suggestedRetailPriceInfo: {} };
export function article(state = initialState, action) {
    state.ArticleAccessories= [];
    switch (action.type) {
        case articleConstants.LIST_ARTICLE_SUCCESS: 
            return { ...state, listArticle: action.data };
            case userConstants.LIST_USER_SUCCESS:
                return { ...state, userslist: action.data }; 
        case articleConstants.GET_FIELDS_FROM_SKUTYPE_SUCCESS: 
            return { ...state, ArticleFieldsOfSKUType: action.data };    

        case articleConstants.GET_MARKET_FIELDS_FOR_LOCALISE_ARTICLE_SUCCESS :
            const market = [];
            action.data?.map((item,idx) => {
                market.push(
                {
                MarketName : (Object.keys(action.data[idx])[idx]),
                currency : Object.values(action.data[idx])[idx].currency,
                language: Object.values(action.data[idx])[idx].language,
                partners: Object.values(action.data[idx])[idx].partners
                }
            )
              })
            return { ...state, MarketListForLocaliseArticle: market } ; 
        case articleConstants.GET_ACCESSORIES_FIELDS_FOR_LOCALISE_ARTICLE_SUCCESS :
              const searchData = [];
              action.data.data.map((item,idx) => { searchData.push({"title": item.description.code })}) 

            return {...state, ArticleAccessories : searchData}

        case articleConstants.LIST_ARTICLE_BY_SKU_SUCCESS :
            return { ...state, listArticleBySKU: action.data }; 
        
        case articleConstants.GET_MAPPED_ACCESSORIES_FROM_SKUTYPE_SUCCESS :
            const listMappedAccessoriesData = [];
            action.data.length ? action.data[0].accessory.HK.value.map((item) => { listMappedAccessoriesData.push(item)}) :  listMappedAccessoriesData
            return { ...state, listMappedAccessoriesBySKU: listMappedAccessoriesData }; 
            
        case articleConstants.GET_ARTICLE_SYSTEM_CONFIGURATION_SUCCESS :
            let getArticleSystemConfiguration = [{}];
            action.data.systemConfig ? getArticleSystemConfiguration = action.data.systemConfig.HK[0] : getArticleSystemConfiguration;
            return { ...state, articleSystemConfigurationInfo: getArticleSystemConfiguration }; 

        case articleConstants.GET_SUGGESTED_RETAIL_PRICE_SUCCESS :
            let suggestedRetailPriceData = {};
            action.data.length ? suggestedRetailPriceData = action.data[0].price.HK.value : suggestedRetailPriceData
            return { ...state, suggestedRetailPriceInfo: suggestedRetailPriceData }; 
        default:
            return state
    }
}
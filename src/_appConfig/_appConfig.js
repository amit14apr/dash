const appConfig = {
  userService: {
      apiDomain: process.env.REACT_APP_USER_SERVICE_API_ENDPOINT,
      profile: process.env.REACT_APP_USER_SERVICE_PROFILE,
      label: process.env.REACT_APP_USER_SERVICE_LABEL
  },
  articleService: {
    apiDomain: process.env.REACT_APP_ARTICLE_SERVICE_API_ENDPOINT,
    profile: process.env.REACT_APP_ARTICLE_SERVICE_PROFILE,
    label: process.env.REACT_APP_ARTICLE_SERVICE_LABEL
  },
  inventoryService: {
    apiDomain: process.env.REACT_APP_INVENTORY_SERVICE_API_ENDPOINT,
    profile: process.env.REACT_APP_INVENTORY_SERVICE_PROFILE,
    label: process.env.REACT_APP_INVENTORY_SERVICE_LABEL
  },
  configService: {
    apiDomain: process.env.REACT_APP_CONFIG_SERVICE_API_ENDPOINT
  }
}
  export default appConfig;
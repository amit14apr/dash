const currentLang = {
    "en" : require('./en.json')
  };
  export default currentLang[localStorage.getItem("lang") || "en"];

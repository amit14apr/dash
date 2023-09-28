export function authToken() {
    // return authorization header with jwt token
    // let user = noQuotes(localStorage.getItem('user'));
    let user = noQuotes(getCookie('user'));

    if (user) {
        return { 'token': user };
    } else {
        return {'token': null };
    }
   function noQuotes(str) {
        return str ? str.replace(/['"]+/g, '') : null;
   } 
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
}
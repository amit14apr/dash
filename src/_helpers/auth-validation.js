import { authToken } from '../_helpers'
export function isLoogedIn() {
    let user = authToken().token;
    return user ? true : false;
}
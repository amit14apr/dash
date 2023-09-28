import { history } from "./history";

export const autoLogOut = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push('/');
}
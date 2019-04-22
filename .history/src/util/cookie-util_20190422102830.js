import Cookie from "js-cookie";

const COOKIE_ID = "SJDKSJFKLJDSF";
const COOKIE_DATA = "2395UNh21u3~~￥@￥#￥@#";

export default function isLogin() {
    return _getCookie(COOKIE_ID, COOKIE_DATA);
}


function _getCookie(key) {
    const cookieValue = Cookie.get();
}

function _setCookie(key, value) {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 30);
    Cookie.set(key, value, { expires: date, path: '/' });
}


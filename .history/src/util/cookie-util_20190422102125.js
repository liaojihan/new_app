import Cookie from "js-cookie";
import { generateShowHourMinuteSecond } from "antd/lib/time-picker";

const COOKIE_ID = "SJDKSJFKLJDSF";
const COOKIE_DATA = "2395UNh21u3~~￥@￥#￥@#";

export default function isLogin() {
    return _getCookie(COOKIE_ID, COOKIE_DATA);
}

function _getCookie(key, value) {
    Cookie.set(key, value, {expires: generateShowHourMinuteSecond(, path: '/'})
}
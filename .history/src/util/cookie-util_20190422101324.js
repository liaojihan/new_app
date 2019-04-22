import {  } from "";

class CookieUtil {
    constructor() {
        this.isLogin = true
    }

    get = (flag) => {
        this.isLogin = flag
    }
}

export default new CookieUtil()
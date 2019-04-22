import { observable, action } from 'mobx'

class AppStore {

    @observable refreshCode = 0 // 0:首页，1:电影，2: 榜单， 3: 详情
    @observable componentStatus = {} // 页面状态

    @action
    refresh (code) {
        this.refreshCode = code;
    }

    setComponentStatus(sign) {
        this.componentStatus = {
            sign: sign
        }
    }

    getComponentStatus() {
        re
    }

}

export default new AppStore()
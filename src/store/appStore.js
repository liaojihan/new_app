import { observable, action, configure } from 'mobx'

configure({ enforceActions: 'observed'}) // 开启严格模式，只能在action下修改被观察对象
class AppStore {

    @observable refreshCode = 0 // 0:首页，1:电影，2: 榜单， 3: 详情
    @observable componentStatus = {} // 页面状态

    @action
    refresh (code) {
        this.refreshCode = code
    }

    @action
    setComponentStatus(status) {
        this.componentStatus = status
    }

}

export default new AppStore()
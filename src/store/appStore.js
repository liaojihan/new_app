import { observable, action, configure } from 'mobx'

configure({ enforceActions: 'observed'}) // 开启严格模式，只能在action下修改被观察对象
class AppStore {

    urlCode = {
        'home': 0,
        'film_url': 1,
        'release_url': 2,
        'top_url': 3
    } 
    @observable refreshCode = 0; // 0:首页，1:电影，2: 榜单， 3: 详情
    @observable componentStatus = {} // 页面状态

    @action
    refresh(key) {
        this.refreshCode = this.urlCode[key]
        console.log(this.refreshCode);
    }

    @action
    setComponentStatus(key, value) { // 每次路由访问记录一条
        console.log("add before", this.componentStatus);
        this.componentStatus[key] = value
        console.log("add after", this.componentStatus);
    }

}

export default new AppStore()
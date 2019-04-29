import { get } from "axios";
export function getTodayBox() {
    return get('http://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a')
}
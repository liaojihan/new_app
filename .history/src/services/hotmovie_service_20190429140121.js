import { get } from "axios";

export function getHotMovie() {
    return get('https://api.douban.com/v2/movie/in_theaters?start=0&count=12')
}
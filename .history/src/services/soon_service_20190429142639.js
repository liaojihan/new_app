import { get } from "http";


export function getSoonMovie() {
    return get('http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=12');
}
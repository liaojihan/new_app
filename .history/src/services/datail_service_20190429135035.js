import { get } from "axios";

export function getHotMovie (){
    return get('https://jsonplaceholder.typicode.com/posts')
}
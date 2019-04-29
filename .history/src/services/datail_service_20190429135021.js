import { get } from "axios";

export getHotMovie = () => {
    return get('https://jsonplaceholder.typicode.com/posts')
}
import { get } from "axios";

export default getHotMovie = () => {
    return get('https://jsonplaceholder.typicode.com/posts')
}
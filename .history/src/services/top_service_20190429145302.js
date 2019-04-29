import { get } from "axios";

export function getTopMovie(url) {
    return get(url);
}
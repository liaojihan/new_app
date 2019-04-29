import * as type from "./actionType"
import { getTopMovie } from '../services/'

export const loadTopMovie = (dispatch) => {
    const response = getTopMovie()
}
import * as type from "./actionType"
import { getTopMovie } from '../services/to'

export const loadTopMovie = (dispatch) => {
    const response = getTopMovie()
}
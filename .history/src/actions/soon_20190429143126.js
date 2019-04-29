import * as type from "./actionType"
import { } from '../services/soon_service'

export const loadSoonMovie = (dispatch) => {
    const response = getSoonMovie()
    dispatch({
        type: type.LOAD_HOT_MOVIE,
        payload: response
    });
}
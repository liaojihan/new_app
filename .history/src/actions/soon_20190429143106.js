import * as type from "./actionType"
import { }

export const loadSoonMovie = (dispatch) => {
    const response = getSoonMovie()
    dispatch({
        type: type.LOAD_HOT_MOVIE,
        payload: response
    });
}
import * as type from "./actionType";

export const loadSoonMovie = (dispatch) => {
    const response = get
    dispatch({
        type: type.LOAD_HOT_MOVIE,
        payload: response.data
    });
}
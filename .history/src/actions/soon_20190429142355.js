import {  } from "module";

export const loadSoonMovie = (dispatch) => {
    dispatch({
        type: type.LOAD_HOT_MOVIE,
        payload: response.data
    });
}
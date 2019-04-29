import * as type from "./actionType"
import { getTodayBox } from '../services/todaybox_service'

export const loadSoonMovie = (dispatch) => {
    const response = getTodayBox()
    dispatch({
        type: type.LOAD_HOT_MOVIE,
        payload: response
    });
}
import * as type from "./actionType"
import { getTodayBox } from '../services/todaybox_service'

export const loadSoonMovie = (dispatch) => {
    const response = getTodayBox()
    dispatch({
        type: type.Lo,
        payload: response
    });
}
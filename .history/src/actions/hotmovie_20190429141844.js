import { getHotMovie } from '../services/hotmovie_service'
import * as type from './actionType'

export const loadHotMovieAction = async (dispatch) => {
    const response = await getHotMovie()
    dispatch({
        type: type.load,
        payload: response.data
    });
}
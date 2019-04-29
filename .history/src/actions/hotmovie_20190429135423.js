import getHotMovie from '../services/hotmovie_service'

export const loadHotovieAction = async (dispatch) => {
    const response = await getHotMovie()
    dispatch({
        type: 'LOAD_HOT_MOVIE',
        payload: response.data
    });
}
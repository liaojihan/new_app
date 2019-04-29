
export const loadHotmovieAction = async (dispatch) => {
    const response = await getHotMovie()
    dispatch({
        type: 'LOAD_HOT_MOVIE',
        
    });
}

const hotmovieReducer = (state = {list: []}, action) => {
    switch (action.type) {
        case 'LOAD_HOT_MOVIE':
            return {
                ...state, 
            }
    }
}

export default hotmovieReducer
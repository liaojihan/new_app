
const hotmovieReducer = (state = {list: []}, action) => {
    switch (action.type) {
        case 'LOAD_HOT_MOVIE':
            return {
                ...state, list: action.payload
            }
        default: 
            
    }
}

export default hotmovieReducer
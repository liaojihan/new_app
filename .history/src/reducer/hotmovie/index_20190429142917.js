import * as type from '../actionType'
const hotmovieReducer = (state = {list: []}, action) => {
    switch (action.type) {
        case 'LOAD_HOT_MOVIE':
            return {
                ...state, list: action.payload
            }
        default: 
            return state
    }
}

export default hotmovieReducer
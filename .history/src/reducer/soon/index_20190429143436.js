import * as type from '../../actions/actionType'
const soonReducer = (state = {list: []}, action) => {
    switch (action.type) {
        case type.LOAD_SOON_MOVIE:
            return {
                ...state, list: action.payload
            }
        default:
            return state
    }
}

export default soonReducer
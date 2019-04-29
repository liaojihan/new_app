import * as type from '../../actions/actionType'

const todayBoxReducer = (state = {list : []}, action) => {
    switch (action.type) {
        case type.LOAD_TODAYBOX:
            return {
                ...state, list: action.payload
            }
        default: 
            return state
    }
}

export default todayBoxReducer
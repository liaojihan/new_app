import * as type from "../../actions/actionType"
const hotmovieReducer = (state = {list: []}, action) => {
    switch (action.type) {
        case :
            return {
                ...state, list: action.payload
            }
        default: 
            return state
    }
}

export default hotmovieReducer
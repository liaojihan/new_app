import { combineReducers } from "redux"
import detailsReducer from './details'
import hotmovieReducer from "./hotmovie"
import soonReducer from "./soon"
import todayBoxReducer from "./todaybox"
import topReducer from './top'
import top10Reducer from './top10'

const rootReducers = combineReducers({
    details: detailsReducer,
    hotmovie: hotmovieReducer,
    soon: soonReducer,
    todaybox: todayBoxReducer,
    top: top
})

export default rootReducers

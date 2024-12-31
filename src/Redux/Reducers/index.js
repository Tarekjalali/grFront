import {combineReducers} from "redux"
import AuthReducer from "./AuthReducer"
import eventsReducer from "./EventsReducer"
import applicationReducer from "./ApplicationReducer"
import NewsReducer from "./NewsReducer"
import ErrorsReducer from "./ErrorsReducer"


const rootReducer = combineReducers({AuthReducer, eventsReducer, applicationReducer, NewsReducer , ErrorsReducer})


export default rootReducer
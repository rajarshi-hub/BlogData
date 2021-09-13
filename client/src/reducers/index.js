import { combineReducers } from "redux";
import blogs from './blog_user'
import user from './user_reducer'
const rootReducer = combineReducers({
    blogs,
    user

})
export default rootReducer;
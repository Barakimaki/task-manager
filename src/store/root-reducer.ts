import {combineReducers} from "redux";
import tasksReducer from "./tasks/tasks.reducer";


export const rootReducer = combineReducers({
    tasks: tasksReducer
})
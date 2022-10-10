import { Task} from "./tasks.types"
import {setTasks} from "./tasks.action";
import {AnyAction} from "redux";

export type TasksState = {
    tasks: Task[]
}

const TASKS_INITIAL_STATE: TasksState = {
    tasks: []
}

const tasksReducer = (
    state = TASKS_INITIAL_STATE,
    action: AnyAction
): TasksState => {
    if (setTasks.match(action)) {
        return {...state, tasks: action.payload}
    }
    return state
}

export default tasksReducer
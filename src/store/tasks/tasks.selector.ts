import {createSelector} from 'reselect';
import {RootState} from "../store";
import {TasksState} from "./tasks.reducer";

const selectTasksReducer = (state: RootState): TasksState => state.tasks;

export const selectTasks = createSelector(
    [selectTasksReducer],
    (tasks) => tasks.tasks
);
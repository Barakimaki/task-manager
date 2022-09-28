import {AppStateType} from "../store";
import {taskStatus, TaskType} from "../types/tasksTypes";


export const getTasksToDo = (state: AppStateType): TaskType[] => state.tasks.tasks
    ? state.tasks.tasks.filter(task => task.status === taskStatus.Todo)
    : []
export const getTasksInProgress = (state: AppStateType): TaskType[] => state.tasks.tasks
    ? state.tasks.tasks.filter(task => task.status === taskStatus.InProgress)
    : []
export const getTasksCompleted = (state: AppStateType): TaskType[] => state.tasks.tasks
    ? state.tasks.tasks.filter(task => task.status === taskStatus.Completed)
    : []
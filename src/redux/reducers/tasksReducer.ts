import {InferActionsTypes} from "../store"
import {Sessions, taskStatus, TaskType} from "../types/tasksTypes"
import {v4 as uuidv4} from 'uuid'

const ADD_TASK = 'tasks/ADD_TASK' as const
const DELETE_TASK = 'tasks/DELETE_TASK' as const
const SET_TASK_STATUS_TODO = 'tasks/SET_TASK_STATUS_TODO' as const
const SET_TASK_STATUS_IN_PROGRESS = 'tasks/SET_TASK_STATUS_IN_PROGRESS' as const
const SET_TASK_STATUS_COMPLETED = 'tasks/SET_TASK_STATUS_COMPLETED' as const
const SET_TASK_STATUS = 'tasks/SET_TASK_STATUS' as const
const REORDER_TASK = 'tasks/REORDER_TASK' as const


const initialState = {
    tasks: [] as TaskType[]
}

export type InitialStateType = typeof initialState

const tasksReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_TASK : {
            let tasksCopy = [...state.tasks]
            tasksCopy.push({
                id: uuidv4(),
                title: action.title,
                status: taskStatus.Todo,
                description: action.description,
                sessions: [],
                order: state.tasks.length
            })
            return {
                ...state,
                tasks: tasksCopy
            }

        }
        case DELETE_TASK : {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.id)
            }
        }
        case REORDER_TASK: {
            return ({
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.id) {
                        task.order = action.newOrder
                    }
                    if(action.newOrder < action.oldOrder){
                        if(task.order >= action.newOrder && task.order < action.oldOrder && task.id !== action.id){
                            task.order = task.order + 1
                        }
                    }
                    if(action.newOrder > action.oldOrder){
                        if(task.order <= action.newOrder && task.order > action.oldOrder && task.id !== action.id){
                            task.order = task.order -1
                        }
                    }
                    return task
                })
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => {
                    task.order = index
                    return task
                })
            })

        }
        case SET_TASK_STATUS_TODO: {
            return ({
                ...state,
                tasks: state.tasks.map(task=> {
                    if (task.id === action.id) {
                        task = {
                            ...task,
                            status: taskStatus.Todo,
                            sessions: [],
                        }
                    }
                    return task
                })
            })
        }
        case SET_TASK_STATUS_IN_PROGRESS: {
            return ({
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.id) {
                        let newSessions = [...task.sessions]
                        newSessions.push({
                            timeStart: new Date(),
                            timeFinish: null
                        })
                        task = {
                            ...task,
                            status: taskStatus.InProgress,
                            sessions: newSessions,
                        }
                    }
                    return task
                })
            })
        }
        case SET_TASK_STATUS_COMPLETED: {
            return ({
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.id) {
                        let newSessions: Sessions[] = []
                        if (task.sessions.length > 0) {
                            newSessions = [...task.sessions]
                            newSessions[newSessions.length - 1].timeFinish = new Date()
                        }
                        task = {
                            ...task,
                            status: taskStatus.Completed,
                            sessions: newSessions,
                        }
                    }
                    return task
                })
            })
        }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof tasksActions>

export const tasksActions = {
    addTask: (title: string, description: string) => ({
        type: ADD_TASK,
        title,
        description
    }),
    deleteTask: (id: string) => ({
        type: DELETE_TASK,
        id
    }),
    setTaskStatusTodo: (id: string) => ({
        type: SET_TASK_STATUS_TODO,
        id
    }),
    setTaskStatusInProgress: (id: string) => ({
        type: SET_TASK_STATUS_IN_PROGRESS,
        id
    }),
    setTaskStatusCompleted: (id: string) => ({
        type: SET_TASK_STATUS_COMPLETED,
        id
    }),
    setTaskStatus: (id: string, from: taskStatus, to: taskStatus) => ({
        type: SET_TASK_STATUS,
        id,
        from,
        to
    }),
    reorderTask: (id: string, newOrder: number, oldOrder: number) => ({
        type: REORDER_TASK,
        id,
        newOrder,
        oldOrder
    })

}


export default tasksReducer
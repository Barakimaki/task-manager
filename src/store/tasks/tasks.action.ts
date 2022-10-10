import {Task, TASKS_ACTION_TYPES, taskStatus} from "./tasks.types";
import {v4 as uuidv4} from 'uuid'
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";

const addNewTask = (
    tasks: Task[],
    title: string,
    description: string
): Task[] => {
    const newTask: Task = {
        id: uuidv4(),
        title: title,
        status: taskStatus.Todo,
        description: description,
    }
    tasks.push(newTask)
    return tasks
}
const removeTask = (
    tasks: Task[],
    id: string,
): Task[] => tasks.filter((task) => task.id !== id)

const changeTaskStatus = (
    tasks: Task[],
    id: string,
    status: taskStatus
): Task[] => {
    return tasks.map(task => {
        if(task.id === id){
            return ({...task, status: status})
        }
        return task
    })
}

const reorderTasks = (
    tasks: Task[],
    destinationIndex: number,
    sourceIndex: number,
): Task[] => {
        let element = tasks[sourceIndex];
        tasks.splice(sourceIndex, 1);
        tasks.splice(destinationIndex, 0, element);
    console.log(tasks)
        return tasks
}

export type SetTasks = ActionWithPayload<TASKS_ACTION_TYPES.SET_TASKS, Task[]>

export const setTasks = withMatcher((tasks: Task[]): SetTasks =>
    createAction(TASKS_ACTION_TYPES.SET_TASKS, tasks)
)

export const addNewTaskToTasks = (
    tasks: Task[],
    title: string,
    description: string
) => {
    const newTasks = addNewTask(tasks, title, description);
    return setTasks(newTasks);
};

export const removeTaskFromTasks = (
    tasks: Task[],
    id: string,
) => {
    const newTasks = removeTask(tasks, id);
    return setTasks(newTasks);
};

export const setNewTaskStatus = (
    tasks: Task[],
    id: string,
    status: taskStatus
)=> {
    const newTasks = changeTaskStatus(tasks, id, status);
    return setTasks(newTasks);
}

export const setNewTasksOrder = (
    tasks: Task[],
    destinationIndex: number,
    sourceIndex: number,
)=> {
    const newTasks = reorderTasks(tasks, destinationIndex, sourceIndex);
    return setTasks(newTasks);
}
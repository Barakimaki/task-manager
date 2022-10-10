export enum TASKS_ACTION_TYPES {
    SET_TASKS = 'tasks/SET_TASKS',
}

export enum taskStatus{
    Todo,
    InProgress,
    Completed
}

export type Task = {
    id: string
    title: string
    status: taskStatus
    description: string
}

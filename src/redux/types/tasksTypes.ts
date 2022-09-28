export enum taskStatus{
    Todo,
    InProgress,
    Completed
}

export type Sessions = {
    timeStart: null | Date
    timeFinish: null | Date,
}

export type TaskType = {
    id: string
    title: string
    status: taskStatus
    description: string
    sessions: Sessions[]
    order: number
}

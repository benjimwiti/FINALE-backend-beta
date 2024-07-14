export interface ITask {
    title: string,
    description: string,
    completed?: boolean,
    labels: string[],
    userId: string,
    dueDate?: Date
}
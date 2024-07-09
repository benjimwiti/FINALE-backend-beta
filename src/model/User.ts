import { ITask } from "./Task";

export interface IUser {
    name: string;
    email: string;
    password: string;
    tasks: Array<ITask>;
}
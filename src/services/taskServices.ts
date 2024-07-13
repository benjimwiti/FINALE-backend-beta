import TaskDao, { ITaskModel } from "../daos/TaskDao"
import UserDao from "../daos/UserDao"
import { ITask } from "../model/Task"
import { UnableToCheckOffTask, UnableToDeleteTask, UnableToFetchTask, UnableToFetchUserTasks, UnableToModifyTask } from "../utils/taskErrors"
import { UnableToCreateTask } from "../utils/userErrors"
import { findUserById } from "./userService"

export const createTask = async (task: ITask): Promise<ITaskModel> => {
    try {
        //save to task collection
        const newTask = new TaskDao(task)
        const savedTask: ITaskModel = await newTask.save()
        return savedTask

    } catch (err:any) {
        throw new UnableToCreateTask(`unable to create task; ${err.message}`)
    }
}

//modified this
export const modifyTask = async (taskId: string, updatedTask:ITask) => {
    try {
        const modifiedTask = await TaskDao.findByIdAndUpdate(taskId, updatedTask, {new: true})

        await UserDao.updateOne(
            { _id: modifiedTask?.userId, 'tasks._id': modifiedTask?._id },
            { $set: { 'tasks.$.title': updatedTask.title, 'tasks.$.description': updatedTask.description, 'tasks.$.label': updatedTask.label, 'tasks.$.dueDate': updatedTask.dueDate, 'tasks.$.completed': updatedTask.completed } }
        );

        return modifiedTask
    } catch (error: any) {
        throw new UnableToModifyTask(`unable to modify Task -- ${error.message}`)
    }
}
//modified this
export const deleteTask = async (taskId: string) => {
    try {
        const taskToDelete = await TaskDao.findById(taskId)

        await UserDao.updateOne(
            { _id: taskToDelete?.userId },
            { $pull: { tasks: { _id: taskId } } }
        );

        const modifiedTask = await taskToDelete?.deleteOne()
        return modifiedTask
    } catch (error: any) {
        throw new UnableToDeleteTask(`unable to modify Task -- ${error.message}`)
    }
}

export const checkTask = async (taskId: string) => {
    try {
        const completedTask = await TaskDao.findById(taskId)
        if(completedTask) {
            completedTask.completed =  true
        }
        return completedTask
    } catch (error: any) {
        throw new UnableToCheckOffTask(`unable to check off Task -- ${error.message}`)
    }
}

 export const fetchTask = async (taskId: string): Promise<ITaskModel | null> => {
    try {
        const task = await TaskDao.findById(taskId);
        if (!task) {
            throw new UnableToFetchUserTasks(`Task with id ${taskId} not found`);
        }
        return task;
    } catch (error: any) {
        throw new UnableToFetchTask(`unable to fetch task -- ${error.message}`);
    }
};
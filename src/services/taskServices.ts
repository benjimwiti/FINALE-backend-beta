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

export const modifyTask = async (taskId: string, updatedTask:ITask) => {
    try {
        const modifiedTask = TaskDao.findByIdAndUpdate(taskId, updatedTask, {new: true})
        return modifiedTask
    } catch (error: any) {
        throw new UnableToModifyTask(`unable to modify Task -- ${error.message}`)
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        const taskToDelete = await TaskDao.findById(taskId)
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
export const fetchTask = async (taskId: string) => {
    try {
        const task = await TaskDao.findById(taskId)
        return task
    } catch (error: any) {
        throw new UnableToFetchTask(`unable to check off Task -- ${error.message}`)
    }
}

// export const fetchUserTasks = async (userId:string) => {
//     try {
//         const user = await UserDao.findById(userId)
//         const userTasks = user?.tasks || []
//         return userTasks

//     } catch (error: any) {
//         throw new UnableToFetchUserTasks(`unable to modify Task -- ${error.message}`)
//     }
// }


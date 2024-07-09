import TaskDao, { ITaskModel } from "../daos/TaskDao"
import { ITask } from "../model/Task"
import { UnableToCreateTask } from "../utils/userErrors"
import { findUserById } from "./userService"

export const createTask = async (task: ITask): Promise<ITaskModel> => {
    try {
        //save to task collection
        const newTask = new TaskDao(task)
        const savedTask: ITaskModel = await newTask.save()
        
        //modify the user's task List
        let user = await findUserById(savedTask.userId)
        if (user) {
            const existingTasks = user?.tasks ||  []
            const newTaskList = [savedTask, ...existingTasks]
            user.tasks = newTaskList
            await user.save()
        }

        return savedTask

    } catch (err:any) {
        throw new UnableToCreateTask(`unable to create task; ${err.message}`)
    }
}


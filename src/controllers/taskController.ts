import { Request, Response } from "express";
import { checkTask, createTask, deleteTask, fetchTask, /* fetchUserTasks ,*/ modifyTask } from "../services/taskServices";
import TaskDao, { ITaskModel } from "../daos/TaskDao";
import { getUserTasks, pushToTaskList } from "../services/userService";

export const handleTaskCreation = async ( req:Request, res:Response ) => {
    const newTask = req.body
    const savedTask = await createTask(newTask) as ITaskModel
    const data = savedTask._id ? await pushToTaskList(savedTask.userId, savedTask) :  `unable to add to userTaskList`
    res.status(201).json({
        message: `successfully saved ${savedTask.title} to the database`,
        savedTask,
        data
    })

}
export const handleTaskModification = async ( req:Request, res:Response ) => {
    const { id: taskId} = req.params
    console.log(taskId)
    const updates = req.body
    const modifiedTask = await modifyTask(taskId, updates)
    res.status(201).json(modifiedTask)

}
export const handleTaskDeletion = async ( req:Request, res:Response ) => {
    const { id: taskId} = req.params
    const deletedTask = await deleteTask(taskId)
    res.status(201).json(deletedTask)

}

export const handleTaskCompletion = async ( req:Request, res:Response ) => {
    const { id: taskId} = req.params
    const completedTask = await checkTask(taskId)
    res.status(201).json(completedTask)
}

export const handleFetchTask = async ( req:Request, res:Response ) => {
    const { id: taskId} = req.params
    const requestedTask = await fetchTask(taskId)
    res.status(201).json(requestedTask)
}

export const handleFetchUserTasks = async ( req:Request, res:Response ) => {
    const { userId } = req.params
    const userTasks = await getUserTasks(userId)
    res.status(200).json({
        message: `here are all your tasks`,
        userTasks
    })
}
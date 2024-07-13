import { Request, Response } from "express";
import { createTask, deleteTask,  modifyTask, fetchTask, checkTask } from "../services/taskServices";
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
// Controller function to fetch a single task by taskId
export const handleFetchTask = async (req: Request, res: Response) => {
    const { id: taskId } = req.params;
    try {
        const task = await fetchTask(taskId);
        if (!task) {
            return res.status(404).json({ message: `Task with id ${taskId} not found` });
        }
        res.status(200).json(task);
    } catch (error:any) {
        res.status(500).json({ message: `Error fetching task: ${error.message}` });
    }
};
export const handleFetchUserTasks = async ( req:Request, res:Response ) => {
    const { userId } = req.params
    const userTasks = await getUserTasks(userId)
    res.status(200).json({
       
        userTasks
    }) 
}

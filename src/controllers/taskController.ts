import { Request, Response } from "express";
import { createTask } from "../services/taskServices";

export const handleTaskCreation = async ( req:Request, res:Response ) => {
    const newTask = req.body
    const savedTask = await createTask(newTask)
    res.status(201).json(savedTask)

}
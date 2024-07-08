import { NextFunction, Request, Response } from "express"
import { createUser } from "../services/userService"

export const handleRegister =  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    try {
        const savedUser = await createUser(newUser)
        res.status(201).json({
            message: `user successfully created`,
            savedUser
        })
    } catch (e) {
        next(e)
    }
}
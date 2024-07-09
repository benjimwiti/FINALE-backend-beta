import {Express, Request, Response} from "express"
import authRouter from './authRoutes'
import tasksRouter from './taskRoutes'
import userRouter from './userRoutes'

export function registerRoutes(app: Express) {
    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({ message: "Server is running properly updated" });
    });
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/tasks', tasksRouter)
}
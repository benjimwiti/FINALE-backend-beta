import {Express, Request, Response} from "express"
import authRouter from './authRoutes'

export function registerRoutes(app: Express) {
    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({ message: "Server is running properly updated" });
    });
    app.use('/auth', authRouter)
}
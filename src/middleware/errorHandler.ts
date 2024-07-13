import { logEvents } from "./logger"
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { CookieIsAbsent, ErrorWhileRefreshingToken, UnableToAppendTask, UnableToAuthenticatePassword, UnableToCreateTask, UnableToDeleteAccount, UnableToFindUser, UnableToFindUserByEmail, UnableToFindUsers, UnableToRegisterUser, UnableToUpdateAccount } from "../utils/userErrors"
import { UnableToDeleteTask, UnableToFetchUserTasks, UnableToModifyTask } from "../utils/taskErrors"

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next:NextFunction) => {
    console.log('error handler')
    console.log(res.statusCode)
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
   // console.log(err.stack)

    let status = 501 // server error 

    
    if(err instanceof UnableToRegisterUser) {
        res.status(400)
        res.json({
            message: err.message,
            isError: true 
        })
    } else if (err instanceof UnableToCreateTask) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToFindUser) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToFindUsers) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToDeleteAccount) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToUpdateAccount) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToModifyTask) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToDeleteTask) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToFetchUserTasks) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToAppendTask) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToFindUserByEmail) {
        res.status(400).json({
            message: err.message
        })
    } else if (err instanceof UnableToAuthenticatePassword) {
        res.status(401).json({
            message: err.message
        })
    } else if (err instanceof CookieIsAbsent) {
        res.status(401).json({
            message: err.message
        })
    } else if (err instanceof ErrorWhileRefreshingToken) {
        res.status(401).json({
            message: err.message
        })
    }


    
    else {
    res.status(status).json({
        message: `error Handler some undefined error occured ${err.message}`
    })
}
}

export default errorHandler
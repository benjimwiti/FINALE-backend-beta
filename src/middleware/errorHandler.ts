import { logEvents } from "./logger"
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { CookieIsAbsent, ErrorReadingAvatarImageFile, ErrorUnlinkingAvatarImageFile, ErrorWhileRefreshingToken, UnableToAppendTask, UnableToAuthenticatePassword, UnableToCreateTask, UnableToDeleteAccount, UnableToFindUser, UnableToFindUserByEmail, UnableToFindUsers, UnableToRegisterAvatar, UnableToRegisterUser, UnableToUpdateAccount } from "../utils/userErrors"
import { UnableToCheckOffTask, UnableToDeleteTask, UnableToFetchTask, UnableToFetchUserTasks, UnableToModifyTask } from "../utils/taskErrors"

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next:NextFunction) => {
    console.log('error handler')
    console.log(res.statusCode)
    // console.log(err)
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
        if(err.message.includes(`duplicate`)) {
            res.status(409).json({
                message: `user with new email already exists`
            })
        } else{
        res.status(400).json({
            message: err.message
        })}
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
    } else if (err instanceof UnableToCheckOffTask) {
        res.status(500).json({
            message: err.message
        })
    } else if (err instanceof UnableToFetchTask) {
        res.status(500).json({
            message: err.message
        })
    } else if (err instanceof UnableToRegisterAvatar) {
        res.status(500).json({
            message: err.message
        })
    } else if (err instanceof ErrorReadingAvatarImageFile) {
        res.status(500).json({
            message: err.message
        })
    } else if (err instanceof ErrorUnlinkingAvatarImageFile) {
        res.status(500).json({
            message: err.message
        })
    }


    
    else {
    res.status(status).json({
        message: `error Handler some undefined error occured ${err.message} ${err}`
    })
    console.log(err.message)
}
}

export default errorHandler
import { logEvents } from "./logger"
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { UnableToRegisterUser } from "../utils/userErrors"

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
    } 
    
    else {
    res.status(status).json({
        message: `error Handler err message`
    })
}
}

export default errorHandler
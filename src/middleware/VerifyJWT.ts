import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { accessTokenSecret } from '../config/TSenv'

const verifyJWT = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(authHeader)

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        accessTokenSecret,
        (err: jwt.VerifyErrors | null, decoded:any) => {
            if (err) return res.status(403).json({
                message: `Forbidden ${err.message} ` 
            })
            req.user = decoded.UserInfo.name
            req.email = decoded.UserInfo.email
            next()
        }
    )
}

export default verifyJWT 
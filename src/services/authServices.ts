import argon2 from "argon2"
import UserDao from "../daos/UserDao"
import { ErrorWhileRefreshingToken, UnableToAuthenticatePassword } from "../utils/userErrors"
import jwt from "jsonwebtoken"
import { findUserByEmail } from "./userService"
import { refreshTokenSecret } from "../config/TSenv"

export const authenticatePassword = async (userId:string , password:string) => {
    try {
        const user = await UserDao.findById(userId).lean()
        const hash = user?.password as string
        const isValid = argon2.verify(hash, password)
        return isValid
    } catch (error:any) {
        throw new UnableToAuthenticatePassword(`unable to authenticate user ${error.message}`)
    }
}

export const refreshTokenLogic = async (err: any, decoded: any) => {
    try {
        const { user } = await findUserByEmail(decoded?.email)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "name": user?.name,
                    "email": user?.email
                }
            },
            refreshTokenSecret,
            { expiresIn: '1d' }
        )
        return accessToken
        
    } catch (error: any) {
        throw new ErrorWhileRefreshingToken(`unable to refresh access Token ${error.message}`)
    }
}

export const pwdHasher = async (pwd: string) => {
    const hash = await argon2.hash(pwd, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64 MiB
        timeCost: 4, // Number of iterations
        parallelism: 2, // Number of threads
        hashLength: 32, // Length of the hash

    })
    return hash
} 
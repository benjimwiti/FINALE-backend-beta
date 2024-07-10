import { NextFunction, Request, Response } from "express"
import { authenticatePassword, createUser, findUserByEmail, refreshTokenLogic } from "../services/userService"
import { CookieIsAbsent, UnableToRegisterUser } from "../utils/userErrors"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { CustomRefreshCookies } from "../model/Cookies"
import { accessTokenSecret, refreshTokenSecret } from "../config/TSenv"


export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    let newUser = req.body
    const hash = await argon2.hash(newUser.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64 MiB
        timeCost: 4, // Number of iterations
        parallelism: 2, // Number of threads
        hashLength: 32, // Length of the hash

    })
    newUser.password = hash

        const savedUser = await createUser(newUser)
        res.status(201).json({
            message: `user successfully created`,
            savedUser
        }) 
    }

//LOGIN
export const handleLogin = async (req: Request, res:Response) => {
    const { email, password } = req.body

    const { user, id } = await findUserByEmail(email)
    const isValid = await authenticatePassword(id, password)


    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "name": user.name,
                "email": user.email
            }
        },
        accessTokenSecret,
        { expiresIn: '15s' }
    )

    const refreshToken = jwt.sign(
        { "email": user.email },
        refreshTokenSecret,
        { expiresIn: '1d' }
    )

    // secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: false, //https
        sameSite: 'none', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })
}


export const handleTokenRefresh = (req:Request, res:Response) => {
    const cookies = req.cookies as CustomRefreshCookies
    if (!cookies) throw new CookieIsAbsent(`required cookie is absent`)
        //console.log(cookies)
    const refreshToken = cookies.jwt as string  /* "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4tM0BnbWFpbC5jb20iLCJpYXQiOjE3MjA1OTk1MjIsImV4cCI6MTcyMDY4NTkyMn0.HGJ2dfEOdULUMqAHIN1fZaQ5eOvsLwsjyoApnVaac_g" */

    jwt.verify(
        refreshToken,
        refreshTokenSecret,
        async (err: any, decoded: any) => {
            console.log(decoded)
            const accessToken = await refreshTokenLogic(err, decoded)
            res.json({ accessToken })
        }
    )
}


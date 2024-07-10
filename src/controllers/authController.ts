import { NextFunction, Request, Response } from "express"
import { createUser } from "../services/userService"
import { UnableToRegisterUser } from "../utils/userErrors"
import argon2 from 'argon2'


export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    let newUser = req.body
    const hash = await argon2.hash(newUser.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 4, // 64 MiB
        timeCost: 4, // Number of iterations
        parallelism: 2, // Number of threads
        hashLength: 32, // Length of the hash

    })

        const savedUser = await createUser(newUser)
        res.status(201).json({
            message: `user successfully created`,
            savedUser
        }) 
    }
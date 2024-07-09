import { NextFunction, Request, Response } from "express"
import { createUser } from "../services/userService"
import { UnableToRegisterUser } from "../utils/userErrors"


export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
   // try {
        const savedUser = await createUser(newUser)
        res.status(201).json({
            message: `user successfully created`,
            savedUser
        }) 
   // } catch (error:any) {
        // res.status(500).json({
        //     message: `unable to register user`,
        //     error: error.message
        // })
        // next(error)
    // }
    }

// authController
// import { NextFunction, Request, Response } from "express";
// import { createUser } from "../services/userService";
// import { UnableToRegisterUser } from "../utils/userErrors";

// export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
//     const newUser = req.body;
//     try {
//         const savedUser = await createUser(newUser);
//         res.status(201).json({
//             message: "User successfully created",
//             savedUser
//         });
//     } catch (error: any) {
//         res.status(500).json({
//             message: "Unable to register user",
//             error: error.message
//         });
//         next(error);
//     }
// };
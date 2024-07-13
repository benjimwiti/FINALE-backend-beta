import { NextFunction, Request, Response } from "express"
import {  createUser, findUserByEmail } from "../services/userService"
import { authenticatePassword, refreshTokenLogic, pwdHasher } from "../services/authServices"
import { CookieIsAbsent, UnableToRegisterUser } from "../utils/userErrors"
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { CustomRefreshCookies } from "../model/Cookies"
import { accessTokenSecret, refreshTokenSecret } from "../config/TSenv"

/******************* USE THIS LOGIC *****************/

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    let newUser = req.body
    const hash = await pwdHasher(newUser.password)
    newUser.password = hash

        const savedUser = await createUser(newUser)
        res.status(201).json({
            message: `user successfully created`,
            savedUser
        }) 
    }


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { user, id } = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await authenticatePassword(id, password);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token =jwt.sign({id:user._id, name:user.name,email:user.email},refreshTokenSecret,{expiresIn:"7d"})
        
        res.cookie("jwt", token,{
            httpOnly: true, // Accessible only by the web server
            secure: false, // Consider setting to true in production with HTTPS
            sameSite: 'none', // Cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiry: set to match refreshToken expiry
          })
          res.status(201).
          json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        })
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const refetch = (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
  
      jwt.verify(token, refreshTokenSecret, {}, (err, data) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(200).json(data);
      });
    } catch (err) {
      console.error('Error in refetch endpoint:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
export const logoutUser = (req: Request, res: Response) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(204).json({
        message: `cookie is not present`,
    })
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: false })
    res.status(200)
    res.json({ message: 'Cookie cleared' })
}


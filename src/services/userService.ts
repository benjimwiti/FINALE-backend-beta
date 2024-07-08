import { NextFunction, Request, Response } from "express";
import UserDao from '../daos/UserDao'
import { IUser } from "../model/User";

export const createUser = async (newUser: IUser) => {
        const createdUser = new UserDao(newUser)
        const savedUser = await createdUser.save()
        return savedUser
        
}
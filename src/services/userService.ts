import mongoose from 'mongoose';
import { ITaskModel, objectId } from '../daos/TaskDao';
import UserDao, { IUserModel } from '../daos/UserDao'
import { IUser } from "../model/User";
import { UnableToGetUserTasks } from '../utils/taskErrors';
import { ErrorWhileRefreshingToken, UnableToAppendTask, UnableToAuthenticatePassword, UnableToDeleteAccount, UnableToFindUser, UnableToFindUserByEmail, UnableToFindUsers, UnableToRegisterUser, UnableToUpdateAccount } from '../utils/userErrors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { refreshTokenSecret } from '../config/TSenv';

export const createUser = async (newUser: IUser):Promise<IUserModel | undefined> => {
    try {
        const createdUser = new UserDao(newUser)
        const savedUser = await createdUser.save()
        if (savedUser) return savedUser  
    } catch (err:any) {
        throw new UnableToRegisterUser("couldn't save the user to MongoDB")
    }
}

export const findUserById = async (userId: string ):Promise<IUserModel | undefined> => {
    try {
        const user = await UserDao.findById(userId)
        if(user) return user
    } catch (err: any) {
        throw new UnableToFindUser(`unable to find User; ${err.message}`)
    }
}

export const findAllUsers = async ():Promise<IUserModel[] | undefined> => {
    try {
        const users = await UserDao.find().lean() //optimization
        if(users) return users
    } catch (err: any) {
        throw new UnableToFindUsers(`unable to find Users; ${err.message}`)
    }
}

export const getUserTasks = async (userId: string): Promise<ITaskModel[] | undefined> => {
    try {
        const user = await UserDao.findById(userId).lean()
        if(user) {
            const userTasks = user.tasks as ITaskModel[]
            return userTasks
        }
    } catch (err: any) {
        throw new UnableToGetUserTasks(`unable to get user tasks: ${err.message}`)
    }
}

export const deleteUserAccount = async (id: string) => {
    try {
        const deletedUserAccount = await UserDao.findByIdAndDelete(id)
        return deletedUserAccount
    } catch (error) {
        throw new UnableToDeleteAccount(`unable to delete account ${id}`)
    }
}

export interface IUserUpdate {
    name?: string,
    email?: string,
    password?: string
}


export const updateUserAccount = async (_id: string, updates: IUserUpdate) => {
    try {
        const {name, email, password} = updates
        const updatedUser = await UserDao.findByIdAndUpdate(_id, updates, {new: true})
        return updatedUser
    } catch (error:any) {
        throw new UnableToUpdateAccount(`unable to update ${error.message}`)
    }
}

export const pushToTaskList = async (userId: string, savedTask: ITaskModel) => {
    try {
        let user = await findUserById(userId)
        if (user) {
            const existingTasks = user.tasks ||  []
            const newTaskList = [savedTask, ...existingTasks]
            user.tasks = newTaskList
            const updatedUser = await user.save()
            const { name, tasks } = updatedUser
            return { name, tasks }
        }
    } catch (error:any) {
        throw new UnableToAppendTask(`unable to append task ${error.message}`)
    }
}

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

export const findUserByEmail = async (email: string) => {
    try {
        const user = await UserDao.findOne({email}) as IUserModel
        const id = user?._id as string
        return { user, id }
    } catch (error:any) {
        throw new UnableToFindUserByEmail(`unable to find user by email ${error.message}`)
    }
}

export const refreshTokenLogic = async (err: any, decoded: any) => {
    try {
        const { user } = await findUserByEmail(decoded.email)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "name": user.name,
                    "email": user.email
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
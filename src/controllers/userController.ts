import { Request, Response } from "express";
import UserDao, { IUserModel } from "../daos/UserDao";
import { deleteUserAccount, findAllUsers, findUserById, returnMinimalUserDetails, updateUserAccount } from "../services/userService";
import { IUser } from "../model/User";

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findUserById(id) as IUserModel
    const userDetails = await returnMinimalUserDetails(user)
    if (user) {
    res.status(200).json({
        message: `read ${user.name} account`,
        user: userDetails
    })
}
}

export const getAllUsers = async (req: Request, res:Response) => {
    const users = await findAllUsers()
    res.status(200).json({
        message: `here are all app users`,
        usersCount: users?.length,
        users
    })
}

export const deleteAccount = async (req: Request, res: Response) => {
    const { id } = req.params
    const deletedUserAccount = deleteUserAccount(id)
    res.status(200).json({
        message: `account ${id} deleted successfully`,
        deletedUserAccount
    })
}

export const updateAccount = async (req: Request, res: Response) => {
    const { id: _id} = req.params
    const updates = req.body
    const updatedUserAccount = await updateUserAccount(_id, updates) as IUserModel
    const userDetails = await returnMinimalUserDetails(updatedUserAccount)
    res.status(200).json({
        message: `updated account ${_id} successfully`,
        updatedUserAccount: { ...userDetails }
    })
}

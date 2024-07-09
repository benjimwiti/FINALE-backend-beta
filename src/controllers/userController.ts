import { Request, Response } from "express";
import UserDao, { IUserModel } from "../daos/UserDao";
import { deleteUserAccount, findAllUsers, findUserById } from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findUserById(id)
    if (user) {
    res.status(200).json({
        message: `read ${user.name} account`,
        user
    })
}
}

export const getAllUsers = async (req: Request, res:Response) => {
    const users = await findAllUsers()
    res.status(200).json({
        message: `here are all app users`,
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
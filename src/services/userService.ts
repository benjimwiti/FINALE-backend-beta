import { ITaskModel } from '../daos/TaskDao';
import UserDao, { IUserModel } from '../daos/UserDao'
import { IUser } from "../model/User";
import { UnableToGetUserTasks } from '../utils/taskErrors';
import { UnableToFindUser, UnableToFindUsers, UnableToRegisterUser } from '../utils/userErrors';

export const createUser = async (newUser: IUser):Promise<IUserModel | undefined> => {
    try {
        const createdUser = new UserDao(newUser)
        const savedUser = await createdUser.save()
        if (savedUser) return savedUser  
    } catch (err:any) {
        throw new UnableToRegisterUser("couldn't save the user to MongoDB")
    }
}

export const findUserById = async (userId: string):Promise<IUserModel | undefined> => {
    try {
        const user = await UserDao.findById(userId)
        if(user) return user
    } catch (err: any) {
        throw new UnableToFindUser(`unable to find User; ${err.message}`)
    }
}

export const findAllUsers = async ():Promise<IUserModel[] | undefined> => {
    try {
        const users = await UserDao.find()
        if(users) return users
    } catch (err: any) {
        throw new UnableToFindUsers(`unable to find Users; ${err.message}`)
    }
}

export const getUserTasks = async (userId: string): Promise<ITaskModel[] | undefined> => {
    try {
        const user = await UserDao.findById(userId)
        if(user) {
            const userTasks = user.tasks as ITaskModel[]
            return userTasks
        }
    } catch (err: any) {
        throw new UnableToGetUserTasks(`unable to get user tasks: ${err.message}`)
    }
}



// UserService
// import UserDao from '../daos/UserDao';
// import { IUser } from "../model/User";
// import { UnableToRegisterUser } from '../utils/userErrors';

// export const createUser = async (newUser: IUser) => {
//     try {
//         const createdUser = new UserDao(newUser);
//         const savedUser = await createdUser.save();
//         if (savedUser) return savedUser;
//     } catch (error: any) {
//         throw new UnableToRegisterUser("Couldn't save the user to MongoDB");
//     }
// };
import UserDao from '../daos/UserDao'
import { IUser } from "../model/User";
import { UnableToRegisterUser } from '../utils/userErrors';

export const createUser = async (newUser: IUser) => {
    try {
        const createdUser = new UserDao(newUser)
        const savedUser = await createdUser.save()
        if (savedUser) return savedUser  
    } catch (error:any) {
            console.log('error creating user')  
            throw new UnableToRegisterUser("couldn't save the user to MongoDB")
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
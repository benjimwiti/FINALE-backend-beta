import { IUser } from "../model/User";
import mongoose, {Schema, Document} from "mongoose";

export interface IUserModel extends IUser, Document {}

export const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
})

export default mongoose.model<IUserModel>('User', userSchema)
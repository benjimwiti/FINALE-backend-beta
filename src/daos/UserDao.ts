import { IUser } from "../model/User";
import mongoose, {Schema, Document} from "mongoose";
import { taskSchema } from "./TaskDao";

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema] ,
        default: []
    },
    avatar: {
        type: String,
        required: false,
        default: ''
    }
},
{
    timestamps: true,
}
)

export default mongoose.model<IUserModel>('User', userSchema)
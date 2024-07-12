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
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema] ,
        default: []
    }
},
{
    timestamps: true,
}
)

export default mongoose.model<IUserModel>('User', userSchema)
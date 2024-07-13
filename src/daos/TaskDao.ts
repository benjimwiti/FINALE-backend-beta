import mongoose, { Schema, Document } from "mongoose"
import { ITask } from "../model/Task"

export interface objectId extends mongoose.Types.ObjectId {}
export interface ITaskModel extends ITask, Document<string> {}

export const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    },
    //changed to string
    label: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dueDate: {
        type: Date,
        required: true,
        
    },
},
{
    timestamps: true
}
) 

export default mongoose.model<ITaskModel>('Task', taskSchema)
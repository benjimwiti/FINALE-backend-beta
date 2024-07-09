import mongoose, { Schema, Document } from "mongoose"
import { ITask } from "../model/Task"

export interface ITaskModel extends ITask, Document {}

export const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: {
        type: [String],
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
}
) 

export default mongoose.model<ITaskModel>('Task', taskSchema)
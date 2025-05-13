import mongoose, {Schema} from "mongoose"
import {ITasks} from '../types/tasks'

const tasksSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    duedate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false
    },

})

export default mongoose.model<ITasks>('tasks', tasksSchema)
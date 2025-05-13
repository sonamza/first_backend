
import { Document } from "mongoose"


export interface ITasks extends Document {
    title:String,
    description:String,
    duedate: Date,
    completed: Boolean
}
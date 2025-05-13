import { Request, Response } from "express"
import Tasks from '../models/tasks.model'
import {ITasks} from '../types/tasks'
import { handleError, isValidObjectId } from "../utils/validators"

// Get all tasks
export const getTasks = async (_req: Request, res: Response 
): Promise<void> => {
    try {
        // Use lean() for better performance when you don't
        // need full mongoose documents
        const tasks = await Tasks.find() .lean()
        res.status(200).json(tasks)
    } catch (error) {
        handleError(res, error)
    }
}

// Get tasks by ID
export const getTasksById = async ( req: Request, res: Response
): Promise<void> => {
    try {
        const { id } = req.params
        if (!isValidObjectId(id, res)) return
        const tasks = await Tasks.findById(id).lean()
        if (!tasks) {
            res.status(400).json({ message: 'tasks not found' })
            return
        }
        res.status(200).json(tasks)
    } catch (error) {
        handleError(res, error)
    }
}

//Create new tasks
export const createTasks = async (
    req: Request<{}, {}, ITasks>,
    res: Response
): Promise<void> => {
    try {
        const { title, description, duedate, completed } = req.body

        // check required fields
        if (!title ) {
            res.status(400).json({ message: 'Missing required fields' })
            return
        }


        const tasks = new Tasks({ title, description, duedate, completed })
        const savedTasks = await tasks.save()

        // Extract only needed fields for response
        const { _id, title: taskstitle, description: tasksdescription, duedate: tasksduedate, completed: taskscompleted } = savedTasks
        res.status(201).json({ _id, title: taskstitle, description: tasksdescription, duedate: tasksduedate, completed: taskscompleted })
    } catch (error) {
        handleError(res, error)
    }
}

      // Update tasks
      export const updateTasks = async ( req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            const {title, description, duedate, completed } = req.body

            if (!isValidObjectId(id, res)) return

            //Ensure at least one update field is provided
            if (!title && !description && !duedate && !completed) {
                res.status(400).json({ message: 'No update fields provided' })
                return
            }

            // Build update object dynamically
            const updatedata: Partial<ITasks>= {}
            if (title) updatedata.title = title
            if (description) updatedata.description = description
            if (duedate) updatedata.duedate = duedate
            if (completed) updatedata.completed = completed

            const updatedtasks = await Tasks.findByIdAndUpdate(id, updatedata, {
                new: true,
                runvalidators: true,
            }).lean()

            if (!updatedtasks) {
                res.status(404).json({ message: 'Task not found' })
                return
            }

            res.status(200).json(updatedtasks)

        } catch (error) {
            handleError(res, error)
        }
      }

        // Delete tasks
       export const deleteTasks = async (req: Request, res: Response): Promise<void> => {
       try {
        const { id } = req.params
        if (!isValidObjectId(id, res)) return

        const deletedtasks = await Tasks.findByIdAndDelete(id).lean()
        if (!deletedtasks) {
        res.status(404).json({ message: 'Tasks not found' })
        return
     }

       res.status(200).json({ message: 'Tasks deleted successfully' })
      } catch (error) {
     handleError(res, error)
  }
}

    
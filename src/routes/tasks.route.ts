import { Router } from "express"
import { createTasks, deleteTasks, getTasks, getTasksById, updateTasks,  } from "../controllers/tasks.controller"

const router = Router()

// Create new tasks
router.post('/', createTasks)

// Get all tasks
router.get('/', getTasks)

// Get tasks by id
router.get('/:id', getTasksById)

// Update tasks
router.patch('/:id', updateTasks)

// Delete tasks
router.delete('/:id', deleteTasks)

export default router
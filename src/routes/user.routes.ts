import { Router } from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller'

const router = Router()

// Create new user
router.post('/', createUser)

// Get all users
router.get('/', getUsers)

// Get users by id
router.get('/:id', getUserById)

// Update user
router.patch('/:id', updateUser)

// Delete user
router.delete('/:id', deleteUser)

export default router
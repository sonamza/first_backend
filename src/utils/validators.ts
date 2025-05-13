import mongoose from "mongoose"
import {  Response } from "express"


// Reuseable error handler
export const handleError = (res: Response, error: unknown, statusCode = 500): void => {
    const errorMessage = error instanceof Error ? error.message : 'Server error'
    res.status(statusCode).json({ message: errorMessage })
}

// Validate MongoDB ObjectId
export const isValidObjectId = (id: string, res: Response): boolean => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'In valid users ID format' })
        return false
    }
    return true
}
import express, { Express } from "express"
import cors from 'cors'
import userRoutes from './routes/user.routes'
import tasksRoutes from './routes/tasks.route'

//Initiallize Express app
const app: Express = express()

//MIddleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/tasks', tasksRoutes)

//Root route
app.get('/', (req, res)=> {
    res.send(`
        API is running...

        Status: Online
        Uptime: ${Math.floor(process.uptime())} seconds
        Built with Express + TypeScript + MongoDB
    `)
})

export default app 
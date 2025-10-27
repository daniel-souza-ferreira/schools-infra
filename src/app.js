import express from 'express'
import cors from 'cors'

import { schoolRoutes } from './http/controllers/schools/routes.js'
import { ZodError, z } from 'zod'
import { ResourceNotFoundError } from './http/use-cases/errors/resource-not-found-error.js'

const app = express()

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use('/schools', schoolRoutes)

app.use((error, req, res, next) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: 'Validation error',
            issues: z.treeifyError(error)
        })
    }

    if (error instanceof ResourceNotFoundError) {
        return res.status(404).json(error)
    }

    console.error(error)
    return res.status(500).json({
        message: 'Internal server error.',
    })
})

export default app
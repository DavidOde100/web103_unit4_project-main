import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import customItemsRouter from './routes/customItems.js'
import { resetDatabase } from './config/reset.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

app.use('/api/custom-items', customItemsRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

const startServer = async () => {
    try {
        await resetDatabase()
    } catch (error) {
        console.error('Database initialization failed:', error)
    }

    const server = app.listen(PORT, () => {
        console.log(`server listening on http://localhost:${PORT}`)
    })

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Stop the existing server and try again.`)
        } else {
            console.error(error)
        }
        process.exit(1)
    })
}

startServer()
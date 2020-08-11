import express from 'express'
import winston from 'winston'
import accountsRouter from './routes/accounts.js'
import { promises as fs } from 'fs'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './doc.js'

const { readFile, writeFile } = fs
const app = express()

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'my-bank-api.log' })
    ],
    format: combine(
        label({ label: 'my-bank-api' }),
        timestamp(),
        myFormat
    )
})

global.filename = 'accounts.json'

app.use(express.json())
app.use(cors())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/account', accountsRouter)

app.listen(8080, async () => {
    try {
        await readFile(global.filename, 'UTF-8')
    } catch (error) {
        logger.error(error)

        const initialJson = {
            nextId: 1,
            accounts: []
        }

        writeFile(global.filename, JSON.stringify(initialJson))
            .catch((err) => logger.error(err))
    }
    logger.info('API started')
})
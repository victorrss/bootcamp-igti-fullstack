import { promises as fs } from 'fs'
import express from 'express'
import winston from 'winston'
import gradesRouter from './routes/grades.js'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './doc.js'

// definitions
global.fileName = 'grades.json'
const apiName = 'grades-control-api'

// Init logger
const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: `${apiName}.log` }),
    ],
    format: combine(
        label({ label: apiName }),
        timestamp(),
        myFormat
    )
})

// App
const app = express()

app.use(express.json())
app.use(cors())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/grade', gradesRouter)

app.listen(8080, async () => {
    logger.info('API Started');
    try {
        await fs.readFile(fileName, 'UTF-8')
    } catch (err) {
        logger.error(`File '${fileName}' not found: ${err.message}`)
        const db = { nextId: 1, grades: [] }
        try {
            await fs.writeFile(fileName, JSON.stringify(db))
        } catch (err) {
            logger.error(`Error creating the file '${fileName}': ${err.message}`)
        }
    }
})
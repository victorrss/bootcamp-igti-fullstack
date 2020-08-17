import express from 'express'
import winston from 'winston'

const app = express()

app.use(express.json())

const { printf, combine, label, timestamp } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'log.log' })
    ],
    format: combine(
        label({ label: 'MyApp' }),
        timestamp(),
        myFormat
    )
})

logger.error('Error Log')
logger.warn('Warn Log')
logger.info('Info Log')
logger.verbose('Verbose Log')
logger.debug('Debug Log')
logger.silly('Silly Log')

logger.log('info', 'Error with parameter')

app.listen(8080, () => {
    console.log('API started')
})
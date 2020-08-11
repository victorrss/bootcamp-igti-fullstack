import express from 'express'
import { promises as fs } from 'fs'
//import cors from 'cors'

const { readFile, writeFile } = fs
const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        let account = req.body

        if (!account.name || account.balance == null)
            throw new Error('Name e Balance são obrigatórios')

        const db = JSON.parse(await readFile(global.filename, 'UTF-8'))

        account = {
            id: db.nextId++,
            name: account.name,
            balance: account.balance
        }
        db.accounts.push(account)

        await writeFile(global.filename, JSON.stringify(db))

        res.send(account)

        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`)
    } catch (err) { next(err) }
})

// cors em rota especifica
//router.get('/', cors(), async (req, res, next) => {
router.get('/', async (req, res, next) => {
    try {
        const db = JSON.parse(await readFile(global.filename, 'UTF-8'))

        res.send(db.accounts)

        logger.info(`${req.method} ${req.originalUrl}`)
    } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
    try {
        const db = JSON.parse(await readFile(global.filename, 'UTF-8'))
        const account = db.accounts.find(acc => acc.id == req.params.id)

        res.send(account)

        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`)
    } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const db = JSON.parse(await readFile(global.filename, 'UTF-8'))

        db.accounts = db.accounts.filter(acc => acc.id != req.params.id)

        await writeFile(global.filename, JSON.stringify(db))

        res.end()

        logger.info(`${req.method} ${req.originalUrl}`)
    } catch (err) { next(err) }
})

router.put('/', async (req, res, next) => {
    try {
        const account = req.body

        if (!account.id || !account.name || account.balance == null)
            throw new Error('Name e Balance são obrigatórios')

        const db = JSON.parse(await readFile(global.filename, 'UTF-8'))
        const index = db.accounts.findIndex(acc => acc.id == account.id)

        if (index === -1)
            throw new Error('Registro não encontrado')

        //db.accounts[index] = (({ id, name, balance } = account) => { return { id, name, balance } })()
        db.accounts[index].name = account.name;
        db.accounts[index].balance = account.balance;

        await writeFile(global.filename, JSON.stringify(db))

        res.send(account)

        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`)
    } catch (err) { next(err) }
})

router.patch('/updateBalance', async (req, res, next) => {
    try {
        const account = req.body

        if (!account.id || account.balance == null)
            throw new Error('Balance são obrigatórios')

        const db = JSON.parse(await readFile(global.filename, 'UTF-8'))
        const index = db.accounts.findIndex(acc => acc.id == account.id)

        if (index === -1)
            throw new Error('Registro não encontrado')

        db.accounts[index].balance = account.balance

        await writeFile(global.filename, JSON.stringify(db))

        res.send(db.accounts[index])

        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(db.accounts[index])}`)
    } catch (err) { next(err) }
})

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router
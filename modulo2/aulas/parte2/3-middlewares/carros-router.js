import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send(req.originalUrl)
})

router.get('/preco', (req, res) => {
    res.send(req.originalUrl)
})

export default router
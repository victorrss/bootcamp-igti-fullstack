import express from 'express'
import carrosRouter from './carros-router.js'

const app = express()

app.use(express.json())

app.use('/carros', carrosRouter)

// será executando sempre, em toda requisição.
app.use((req, res, next) => {
    console.log(new Date())
    next()
})

app.get('/teste', (req, res) => {
    res.end()
})

app.listen(8080, () => {
    console.log('API started')
})
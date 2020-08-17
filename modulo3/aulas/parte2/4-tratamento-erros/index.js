import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    throw new Error('Test Error')
})

app.post('/', async (req, res, next) => {
    try {
        throw new Error('Test Error ASYNC')
    } catch (error) {
        next(error)
    }
})

// importante colocar no final
app.use((err, req, res, next) => {
    console.log('Error 1')
    next(err)
})

app.use((err, req, res, next) => {
    console.log('Error 2')
    res.status(500).send('Ocorreu um erro!')
})
app.listen(8080, () => {
    console.log('API started')
})
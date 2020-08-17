import express from 'express'

const app = express()

// work json on solution
app.use(express.json())

// all verbs
app.all('/testeAll', (req, res) => {
    res.send(req.method)
})

// last letter optional
app.get('/teste?', (_req, res) => {
    res.send('/teste?')
})

// end of the word contains one or more letters
app.get('/buzz+', (req, res) => {
    res.send(req.url)
})

// joker
app.get('/one*blue', (req, res) => {
    res.send(req.url
        .toUpperCase()
        .replace('/ONE', '')
        .replace('BLUE', ''))
})

// term optional
app.post('/test(ing)?', (req, res) => {
    console.log(req.body)
    res.send(req.url)
})

// regexp
app.get(/.*Red$/, (req, res) => {
    res.send(req.url)
})

// ---- Route Parameters ----

// on uri
app.get('/testParam/:id/:id2?', (req, res) => {
    res.send(req.params.id + ' ' + req.params.id2 ?? '')
})

// on query
app.get('/testQuery', (req, res) => {
    res.send(`Nome: ${req.query.nome} - Idade: ${req.query.idade}`)
})

// next handler 
app.get('/testeMultipleHandlers', (req, res, next) => {
    console.log('Callback 1')
    next()
}, (req, res) => {
    console.log('Callback 2')
    res.end()
})


// next with array handler 
const callback1 = (req, res, next) => {
    console.log('Callback 1')
    next()
}
const callback2 = (req, res, next) => {
    console.log('Callback 2')
    next()
}
const callback3 = (req, res) => {
    console.log('Callback 3')
    res.end()
}
app.get('/testeMultipleHandlersArray', ([callback1, callback2, callback3]))

// route, define verbs
app.route('/testRoute')
    .get((req, res) => res.send(`${req.url} ${req.method}`))
    .post((req, res) => res.send(`${req.url} ${req.method}`))
    .delete((req, res) => res.send(`${req.url} ${req.method}`))

app.listen(8080, () => {
    console.log('API started')
})
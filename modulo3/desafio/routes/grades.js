import express from 'express'
import { promises as fs } from 'fs'

const router = express.Router()

/*
1.  Crie um endpoint para criar uma grade. Este endpoint deverá receber como parâmetros
    os campos student, subject, type e value conforme descritos acima. Esta grade deverá ser
    salva no arquivo json grades.json, e deverá ter um id único associado. No campo
    timestamp deverá ser salvo a data e hora do momento da inserção. O endpoint deverá
    retornar o objeto da grade que foi criada. A API deverá garantir o incremento automático
    deste identificador, de forma que ele não se repita entre os registros. Dentro do arquivo
    grades.json que foi fornecido para utilização no desafio o campo nextId já está com um
    valor definido. Após a inserção é preciso que esse nextId seja incrementado e salvo no
    próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.
*/
router.post('/', async (req, res, next) => {
    try {
        if (!req.body.student || !req.body.subject || !req.body.type || req.body.value == null)
            throw new Error('Os campos student, subject, type e value são obrigatórios')

        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))

        const grade = {
            id: db.nextId++,
            student: req.body.student,
            subject: req.body.subject,
            type: req.body.type,
            value: req.body.value,
            timestamp: new Date()
        }

        db.grades.push(grade)

        await fs.writeFile(global.fileName, JSON.stringify(db))

        res.send(grade)

        global.logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(grade)}`)
    } catch (err) { next(err) }
})

/*
2.  Crie um endpoint para atualizar uma grade. Este endpoint deverá receber como
    parâmetros o id da grade a ser alterada e os campos student, subject, type e value. O
    endpoint deverá validar se a grade informada existe, caso não exista deverá retornar um
    erro. Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros
    no registro, e realizar sua atualização com os novos dados alterados no arquivo
    grades.json.
*/
router.put('/:id', async (req, res, next) => {
    try {
        const grade = req.body

        if (!grade.student || !grade.subject || !grade.type || grade.value == null)
            throw new Error('Os campos student, subject, type e value são obrigatórios')

        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))
        const index = db.grades.findIndex(g => g.id == req.params.id)

        if (index < 0)
            throw new Error('Registro não encontrado')

        db.grades[index].student = grade.student
        db.grades[index].subject = grade.subject
        db.grades[index].type = grade.type
        db.grades[index].value = grade.value

        await fs.writeFile(global.fileName, JSON.stringify(db))

        res.send(db.grades[index])

        global.logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(db.grades[index])}`)
    } catch (err) { next(err) }
})

/*
3.  Crie um endpoint para excluir uma grade. Este endpoint deverá receber como
    parâmetro o id da grade e realizar sua exclusão do arquivo grades.json.
*/
router.delete('/:id', async (req, res, next) => {
    try {
        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))

        db.grades = db.grades.filter(g => g.id != req.params.id)

        await fs.writeFile(global.fileName, JSON.stringify(db))

        res.end()

        global.logger.info(`${req.method} ${req.originalUrl}`)
    } catch (err) { next(err) }
})

/*
4.  Crie um endpoint para consultar uma grade em específico. Este endpoint deverá
    receber como parâmetro o id da grade e retornar suas informações
*/
router.get('/:id', async (req, res, next) => {
    try {
        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))
        const grade = db.grades.find(g => g.id == req.params.id)

        if (!grade)
            throw new Error('Registro não encontrado')

        res.send(grade)

        global.logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(grade)}`)
    } catch (err) { next(err) }
})

/*
5.  Crie um endpoint para consultar a nota total de um aluno em uma disciplina. O
    endpoint deverá receber como parâmetro o student e o subject, e realizar a soma de
    todas os as notas de atividades correspondentes a aquele subject para aquele student. O
    endpoint deverá retornar a soma da propriedade value dos registros encontrados
*/
router.get('/notas/:student/:subject', async (req, res, next) => {
    try {
        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))
        const notas = db.grades.reduce((sum, g) => {
            if (g.student === req.params.student && g.subject === req.params.subject)
                return sum + g.value
            else return sum
        }, 0);

        res.send({ notas })

        global.logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify({ notas })}`)
    } catch (err) { next(err) }
})

/*
6.  Crie um endpoint para consultar a média das grades de determinado subject e type. O
    endpoint deverá receber como parâmetro um subject e um type, e retornar a média. A
    média é calculada somando o registro value de todos os registros que possuem o subject
    e type informados, e dividindo pelo total de registros que possuem este mesmo subject e
    type.
*/
router.get('/media/:subject/:type', async (req, res, next) => {
    try {
        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))
        let total = 0
        const notas = db.grades.reduce((sum, g) => {
            if (g.subject === req.params.subject && g.type === req.params.type) {
                total++
                return sum + g.value
            }
            else return sum
        }, 0);

        const media = total === 0 ? 0 : notas / total

        res.send({ media })

        global.logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify({ media })}`)
    } catch (err) { next(err) }
})

/*
7.  Crie um endpoint para retornar as três melhores grades de acordo com determinado
    subject e type. O endpoint deve receber como parâmetro um subject e um type retornar
    um array com os três registros de maior value daquele subject e type. A ordem deve ser
    do maior para o menor.
*/
router.get('/melhores/:subject/:type', async (req, res, next) => {
    try {
        const db = JSON.parse(await fs.readFile(global.fileName, 'UTF-8'))

        const melhores = db.grades
            .filter((g) => g.subject === req.params.subject && g.type === req.params.type)
            .sort((a, b) => b.value - a.value)
            .slice(0, 3);

        res.send(melhores)

        global.logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(melhores)}`)
    } catch (err) { next(err) }
})

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.originalUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router
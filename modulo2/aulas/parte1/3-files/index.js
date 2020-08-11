import fs from 'fs';
import { promises as fsPromises } from 'fs';

const filename = 'teste.txt'

// Promise
init()
async function init() {
    try {
        await fsPromises.writeFile(filename, 'teste teste')
        await fsPromises.appendFile(filename, 'APPEND FILE')
        const data = await fsPromises.readFile(filename, 'utf-8')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}


// Assincrona
/*
fs.writeFile(filename, 'teste do arquivo', (err) => {
    if (err)
        console.log(err)
    else
        fs.appendFile(filename, ' concatenacao\n', (err) => {
            if (err)
                console.log(err)
            else
                fs.readFile(filename, 'utf-8', (err, data) => {
                    if (err)
                        console.log(err)
                    else console.log(data)
                })
        })
})

// Sincrona

console.log(1)
fs.writeFileSync(filename, 'teste sync')
console.log(2)
const data = fs.readFileSync(filename, 'utf-8')
console.log(data)
fs.writeFileSync(filename, 'teste sync')
console.log(3)
*/
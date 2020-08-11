import { promises as fs } from 'fs';

const filename = 'teste.txt'

writeReadJson();

async function writeReadJson() {
    try {
        const carros = ['Gol', 'Palio', 'Uno']
        const obj = { carros }
        // escrita
        await fs.writeFile(filename, JSON.stringify(obj))
        // leitura
        const data = JSON.parse(await fs.readFile(filename, 'utf-8'))
        // modificacao do json
        data.carros.push('Azera')
        console.log(data)
        // escrita do json modificado
        await fs.writeFile(filename, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}
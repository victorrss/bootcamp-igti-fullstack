import fm from './file-manager.js'

const path = './files'

let source = {
    states: [],
    cities: []
}
// Inicialização
init()

// Atividade 1
createFilesEstados()

// Atividade 2
console.log('Quantidade de cidades do estado do Acre: ' + getQtyCity('1'))

// Atividade 3
printArrayStateMaxQtyCityTopFive()

// Atividade 4
printArrayStateMinQtyCityTopFive()

// Atividade 5
printArrayNameCityWithMaxLengthByState()

// Atividade 6
printArrayNameCityWithMinLengthByState()

// Atividade 7
printNameCityWithMaxLength()

// Atividade 8
printNameCityWithMinLength()

function init() {
    try {
        // Load json from files
        source.states = JSON.parse(fm.readSync(`${path}/source/estados.json`))
        source.cities = JSON.parse(fm.readSync(`${path}/source/cidades.json`))

        // Set cities on states
        for (const state of source.states) {
            state.cities = []
            for (const city of source.cities)
                if (city.Estado === state.ID)
                    state.cities.push(city)
        }
    } catch (error) {
        console.log('Falha ao iniciar o processamento. Erro: ', error)
    }
}

/*
1.  Criar uma função que irá criar um arquivo JSON para cada estado representado 
    no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes 
    a aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser 
    o UF do estado, por exemplo: MG.json.
*/
async function createFilesEstados() {
    try {
        for (const state of source.states) {
            await fm.write(`${path}/output/${state.Sigla}.json`, JSON.stringify(state.cities, null, '\t'))
        }
    } catch (error) {
        console.log('Falha ao criar os arquivos dos estados/cidades. Atividade 1. Erro: ', error)
    }
}

/*
2.  Criar uma função que recebe como parâmetro o UF do estado, realize a leitura 
    do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
*/
function getQtyCity(stateId) {
    try {
        return getState(stateId).cities.length
    } catch (error) {
        console.log('Falha ao consultar a quantidade de cidades de um determinado estado. Atividade 2. Erro: ', error)
    }
}

/*
3.  Criar um método que imprima no console um array com o UF dos cinco estados que 
    mais possuem cidades, seguidos da quantidade, em ordem decrescente. 
    Você pode usar a função criada no tópico 2. 
    Exemplo de impressão: ['UF - 93', 'UF - 82', 'UF - 74', 'UF - 72', 'UF - 65']
*/
function printArrayStateMaxQtyCityTopFive() {
    try {
        const list = []
        const temp = [...source.states]
            .sort((a, b) => b.cities.length - a.cities.length)
            .slice(0, 5)

        // // TEST - Qual a soma das quantidades de cidades retornada pelo método que imprime os cinco estados com mais cidades?  
        // let count = 0
        // for (const item of temp)
        //     count += item.cities.length
        // console.log('TESTE: ' + count)

        for (const state of temp)
            list.push(`${state.Sigla} - ${state.cities.length}`)

        console.log(list)
    } catch (error) {
        console.log('Falha ao printar o array de 5 estados que tem MAIS cidades. Atividade 3. Erro: ', error)
    }
}

/*
4.  Criar um método que imprima no console um array com o UF dos cinco estados
    que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
    Você pode usar a função criada no tópico 2. 
    Exemplo de impressão: ['UF - 30', 'UF - 27', 'UF - 25', 'UF - 23', 'UF - 21']
*/
function printArrayStateMinQtyCityTopFive() {
    try {
        const list = []
        const temp = [...source.states]
            .sort((a, b) => a.cities.length - b.cities.length)
            .slice(0, 5)
            .sort((a, b) => b.cities.length - a.cities.length)

        // // TEST - Qual a soma das quantidades de cidades retornada pelo método que imprime os cinco estados com mais cidades?  
        // let count = 0
        // for (const item of temp)
        //     count += item.cities.length
        // console.log('TESTE: ' + count)

        for (const state of temp)
            list.push(`${state.Sigla} - ${state.cities.length}`)

        console.log(list)
    } catch (error) {
        console.log('Falha ao printar o array de 5 estados que tem MENOS cidades. Atividade 4. Erro: ', error)
    }
}

/*
5.  Criar um método que imprima no console um array com a cidade de maior nome de
    cada estado, seguida de seu UF. 
    Por exemplo: ['Nome da Cidade – UF', 'Nome da Cidade – UF', ...].
*/
function printArrayNameCityWithMaxLengthByState() {
    try {
        const list = []
        for (const state of source.states) {
            const city = state.cities.sort((a, b) => b.Nome.length - a.Nome.length)[0]
            list.push(`${city.Nome} - ${state.Sigla}`)
        }
        console.log(list)
    } catch (error) {
        console.log('Falha ao printar o array de estados com a cidade de nome com MAIOR tamanho. Atividade 5. Erro: ', error)
    }
}

/*
6.  Criar um método que imprima no console um array com a cidade de menor nome
    de cada estado, seguida de seu UF. 
    Por exemplo: ['Nome da Cidade – UF', 'Nome da Cidade – UF', ...].
*/
function printArrayNameCityWithMinLengthByState() {
    try {
        const list = []
        for (const state of source.states) {
            const city = state.cities.sort((a, b) => a.Nome.length - b.Nome.length)[0]
            list.push(`${city.Nome} - ${state.Sigla}`)
        }
        console.log(list)
    } catch (error) {
        console.log('Falha ao printar o array de estados com a cidade de nome com MENOR tamanho. Atividade 6. Erro: ', error)
    }
}

/*
7.  Criar um método que imprima no console a cidade de maior nome entre todos os
    estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
*/
function printNameCityWithMaxLength() {
    try {
        const city = source.cities
            .sort((a, b) => a.Nome.localeCompare(b.Nome))
            .sort((a, b) => b.Nome.length - a.Nome.length)[0]
        console.log(`${city.Nome} - ${getState(city.Estado).Sigla}`)
    } catch (error) {
        console.log('Falha ao printar a cidade de nome com MAIOR tamanho. Atividade 7. Erro: ', error)
    }
}

/*
8.  Criar um método que imprima no console a cidade de menor nome entre todos os
    estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
*/
function printNameCityWithMinLength() {
    try {
        const city = source.cities
            .sort((a, b) => a.Nome.localeCompare(b.Nome))
            .sort((a, b) => a.Nome.length - b.Nome.length)[0]
        console.log(`${city.Nome} - ${getState(city.Estado).Sigla}`)
    } catch (error) {
        console.log('Falha ao printar a cidade de nome com MENOR tamanho. Atividade 8. Erro: ', error)
    }
}

// Function util
function getState(stateId) {
    for (const state of source.states)
        if (state.ID === stateId)
            return state
}
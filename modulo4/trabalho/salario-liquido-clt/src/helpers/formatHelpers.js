const formatter = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
const formatterPercent = new Intl.NumberFormat('pt-br', { style: 'percent', minimumFractionDigits: 2 })

function formatNumber(value) {
    return formatter.format(value)
}

function formatPercent(value) {
    return formatterPercent.format(value)
}

export { formatNumber, formatPercent }
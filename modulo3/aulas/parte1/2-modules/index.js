import operacoes from './matematica.js';
import mult from './matematica2.js';
import { divisao, resto } from "./matematicaNomeada.js";

console.log(operacoes.nome);
console.log(operacoes.soma(2, 3));
console.log(operacoes.subtracao(2, 3));
console.log(mult(2, 3));
console.log(divisao(2, 3));
console.log(resto(2, 3));
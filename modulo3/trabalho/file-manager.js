import { promises as fs } from 'fs'
import fs2 from 'fs'

function write(path, data) {
    return fs.writeFile(path, data);
}

function read(path) {
    return fs.readFile(path, 'UTF-8');
}

function readSync(path) {
    return fs2.readFileSync(path, 'UTF-8');
}

export default { write, read, readSync }
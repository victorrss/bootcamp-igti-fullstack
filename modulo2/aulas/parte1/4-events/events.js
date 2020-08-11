import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter();

eventEmitter.on('test', obj => {
    console.log(obj);
})

export default eventEmitter
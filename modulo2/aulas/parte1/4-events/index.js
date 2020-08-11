import ev from './events.js'

ev.on('test', obj => {
    console.log('Ouviu tbm');
})

ev.emit('test', 'mensagem')
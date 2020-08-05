const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = []
let messages = []
let index = 0

io.on('connection', socket => {
     socket.emit('loggerIn', {
         users: users.map(s => s.username),
         messages: messages
     })

     socket.on('newuser', username => {
         console.log(`${username} Entrou na sala`)
         socket.username = username;
         users.push(socket);

         io.emit('userOnline', socket.username)
     })   

     socket.on('msg', msg => {
         let message = {
             index: index,
             username: socket.username,
             msg: msg
         }

         messages.push(message)

         io.emit('msg', message)
         
         index++;

     })

    // Desconectar
    socket.on('disconnect', () => {
        console.log(`${socket.username} Saiu da sala`)
        io.emit('userLeft', socket.username);
        users.splice(users.indexOf(socket), 1)
    })
})


http.listen(process.env.PORT || 3000, () => {
    console.log('Executando na porta %s', process.env.PORT || 3000);
});
const path = require('path')
const express =  require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

var mensagens = []

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)
    socket.on('enviarMensagem', data => {
        mensagens.push(data)
        io.emit('renderizarMensagens', data)
    })
})

server.listen(port)
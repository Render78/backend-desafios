import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import { handleSocketConnection } from './controllers/socketController.js';

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', viewsRouter)

handleSocketConnection(socketServer)
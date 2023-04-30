import express from 'express';
import  {Server} from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');
app.use('/',viewsRouter);

const server = app.listen(8080,()=>{
    console.log('server running');
})

const io = new Server(server);

const messages = [];
io.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    socket.on('message',data =>{
        messages.push(data);
        io.emit('messageLogs',messages);//envio a todos los clientes el log de mesjes
    })
    socket.on('authenticated', data =>{
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    })
})

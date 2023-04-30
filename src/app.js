import express from 'express';
import  {Server} from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use('/')
const server = app.listen(8080,()=>{
    console.log('server running');
})

const io = new Server(server);

const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
//sockets set up and defined
sockets.connect(io, PORT)

server.listen(http, PORT);
//this is just a comment to test my new branch 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/../dist/index');
});
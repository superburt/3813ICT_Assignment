const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http").Server(app);
const io = require('socket.io')(http);
const socket = require('./socket')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const path = require('path');
const formidable = require('formidable');

app.use(cors());
app.use(bodyParser.json());

app.use('/Images', express.static(path.join(__dirname, '../src/assets/Images')))

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)} else { console.log('Your mongo database has been created')}
    const dbName = 'chatDB';
    const db = client.db(dbName);
    require('./routes/readUsers.js')(db, app);
    require('./routes/getUser.js')(db, app);
    require('./routes/auth.js')(db, app);
    require('./routes/updateUser.js')(db, app, ObjectID);
    require('./routes/addUser.js')(db, app);
    require('./routes/imgUpload.js')(db, app, formidable);
    require('./routes/removeUser.js')(db, app, ObjectID);
    require('./listen')(app, http);
    socket.connect(io, db)
});
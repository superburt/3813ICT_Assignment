// https://nodejs.org/api/fs.html -> lot of good information here on reading and writing with node file system (fs)
const fs = require('fs');
const file = require('../src/assets/data.json')

//TO BE CONTINUED -> NEXT TO IMPLEMENT fs.readFile in module expoerts 

module.exports = {
    connect: function(io, PORT){
        io.on('connection',(socket)=> {
            console.log('user connection on port' + PORT + ':' + socket.id);

                socket.on('message',(message)=> {
                    io.emit('message', message);
                })
        });
    }
}
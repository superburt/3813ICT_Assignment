
const fs = require('fs');
// const file = require('../Data.json')

module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket)=> {
            fs.readFile('../chat/Data.json', (error, data) => {
                if (error) throw error;
                fileData = JSON.parse(data)    
                io.emit('getUsers', fileData.User);    
                io.emit('chat', fileData.Chat);
            })

        console.log("User connection on port" + PORT + ":" + socket.id);
            socket.on('message', (message)=>{
                io.emit('message', message);
            }),
            socket.on('chat', (chat)=>{       
                
                fs.readFile('../chat/Data.json', (error, data) => {
                    if (error) throw error;
                    var fileData = JSON.parse(data)
                    fileData.Chat.push(chat.messagecontent)
                    dataAsString = JSON.stringify(fileData)
                    fs.writeFile('../Data.json', dataAsString, (error) =>{
                        if (error) throw error;
                    })
                    io.emit('chat', fileData.Chat);
                })
            }),
            socket.on('auth', (auth) =>{

                console.log(auth);
                fs.readFile('../chat/Data.json', (error, data) => {
                    if (error) throw error;
                    var fileData = JSON.parse(data)
                    dataAsString = JSON.stringify(fileData)

                var customer = {};
                customer.email = "";
                customer.pwd = "";
                customer.role = "";
                customer.username = "";
                customer.userId = "";
                customer.valid = "false";

                for (let i=0;i<fileData.User.length; i++){
                    if (auth.email == fileData.User[i].email && auth.pwd == fileData.User[i].pwd){  
                        customer.username = fileData.User[i].username;
                        customer.role = fileData.User[i].role;
                        customer.email = fileData.User[i].email;
                        customer.pwd = fileData.User[i].pwd;
                        customer.userId = fileData.User[i].userId;
                        customer.valid = "true";
                    }
                } 
                io.emit('auth', customer);
            })
        }),
        socket.on('getUsers', (getUsers)=>{
            fs.readFile('../chat/Data.json', (error, data) => {
                if (error) throw error;
                var fileData = JSON.parse(data)   
                console.log(fileData.User[0])            
            })
            io.emit('getUsers', fileData.User);
        }),
        socket.on('user', (user) =>{
            console.log(user.CurrentUserRole)
            fs.readFile('../chat/Data.json', (error, data) => {
                if (error) throw error;
                if (user.CurrentUserRole == "Super"){
                    user.role = "Group Admin";
                } else if (user.CurrentUserRole == "Group Admin"){
                    user.role = "Group Assis";
                }
                var fileData = JSON.parse(data)
                fileData.User.push(user)
                dataAsString = JSON.stringify(fileData)
                fs.writeFile('../chat/Data.json', dataAsString, (error) =>{
                    if (error) throw error;
                })
            })
        }),
        socket.on('deletedUserId' , (deletedUserId) =>{
            fs.readFile('../chat/Data.json', (error, data) => {
                if (error) throw error;
                var fileData = JSON.parse(data)   
                for (let i = 0; i< fileData.User.length; i++){
                    if (fileData.User[i].userId == deletedUserId){
                        fileData.User.splice(i, 1);
                    }
                }
                dataAsString = JSON.stringify(fileData)  
                console.log(dataAsString)             
                fs.writeFile('../chat/Data.json', dataAsString, (error) =>{
                    if (error) throw error;
                    console.log(dataAsString)
                })
                io.emit('getUsers', fileData.User);
            })
        }),
        socket.on('userElavated', (userElevated) =>{
            fs.readFile('../chat/Data.json', (error, data) => {
                if (error) throw error;
                var fileData = JSON.parse(data)  
                for (let i = 0; i< fileData.User.length; i++){
                    if (fileData.User[i].userId == userElevated){
                        fileData.User[i].role = "Super"
                        console.log(fileData.User[i])
                    }
                }   
                dataAsString = JSON.stringify(fileData)  
                fs.writeFile('../chat/Data.json', dataAsString, (error) =>{
                    if (error) throw error;
                    console.log(dataAsString)
                })  
                io.emit('getUsers', fileData.User);      
            })
        })
        });
    }
}
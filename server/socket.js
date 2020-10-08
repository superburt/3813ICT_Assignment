module.exports = {
    connect: function(io, db){
        console.log('A socket is connected')
//defining collection variables to correspond to the mongo data for each
        const groupCollection = db.collection('group');
        const channelCollection = db.collection('channel');     
        const userCollection = db.collection('users');
        
        io.on('connection', (socket)=> { 
            socket.on('chat', (chat)=>{   
                channelCollection.findOne({channelName: chat.channelName}, (err, data)=>{
                    console.log("Socket triggered")
                    if (data){
                        if (data.chatHist[0].chatChat == "No chat history"){
                            console.log("No chats found")
                            chatHistory = data.chatHist
                            chatHistory[0] = {chatChat : chat.chatChat}
                        } else {
                            chatHistory = data.chatHist     
                            chatHistory[chatHistory.length] = {chatChat : chat.chatChat}
                        }
                    } else {
                        console.log("No chat history was found")
                    }

                    channelCollection.updateOne({ channelName : chat.channelName },{$set:{chatHist : chatHistory}}, {upsertL: true},  (err, data) =>{
                        if (err){
                            console.log(err)
                        } else {
                            io.emit('chat', chatHistory);
                        }
                    })
                })
            }),

            socket.on('chatHist', (chatHist)=>{   
                channelCollection.find({channelName: chatHist}).toArray((err, data) =>{
                    console.log('chatHist has been triggered')
                    if (data[0].chatHist){
                        io.emit('chatHist', data[0].chatHist ); 
                    } else {
                        console.log("chatHistory encountered an error at" + data[0])
                    }
                })  
            }),
            

            socket.on('createNewChannel', (createNewChannel)=>{  
                console.log("New channel has been triggered")              
                channelCollection.insertOne({channelName : createNewChannel.channelName, chatHist : [{chatChat : "No chat history"}]}, (err, data)=>{
                    console.log("Channel Created")
                })
                groupCollection.findOne({ groupName : createNewChannel.groupName },  (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        createNewChannelSet = data.channelSet
                        createNewChannelSet[data.channelSet.length] = {channelName : createNewChannel.channelName}
                        console.log(createNewChannelSet)
                    }
                
                    groupCollection.updateOne({ groupName : createNewChannel.groupName },{$set:{channelSet : createNewChannelSet}}, {upsertL: true},  (err, data) =>{
                        if (err){
                            console.log(err)
                        } else {
                                console.log(data)
                        }
                    })
                })
            }),
            socket.on('channel', (channel)=>{  
                SetChan = [] 
                 groupCollection.findOne({groupName: channel}, (err, data) =>{
                     console.log('channel has been triggered')
                     for (i =0; i < data.channelSet.length; i++){
                             SetChan[i] = data.channelSet[i].channelName
                     }
                     io.emit('channel', SetChan);
                 })  
             }),
            
            socket.on('group', (group)=>{  
                console.log('group has been triggered')
                groupSet = []
                userCollection.findOne({username : group}, (err, data)=>{
                    if (data.role == "Super"){
                        groupCollection.find().toArray((err, data) =>{
                            for (i = 0; i< data.length; i++){
                                console.log(data[i].groupName)
                                groupSet[i] = data[i].groupName
                            }
                            io.emit('group', groupSet);
                        })   
                    } else {
                        groupSet = []
                        groupCollection.find().toArray((err, data) =>{
                            for (i = 0; i< data.length; i++){
                                for (j = 0; j < data[i].groupMembers.length ;j++){
                                    if (data[i].groupMembers[j].username == group){
                                        groupSet[i - 1] = data[i].groupName 
                                    }
                                }
                            }
                            io.emit('group', groupSet);
                        }) 
                    }
                })
            }),

            socket.on('user', ()=>{  
                console.log('user has been triggered')
                userCollection.find().toArray((err, data) =>{
                    for (i = 0; i< data.length; i++){
                        io.emit('user', data[i].username );
                    }
                })  
            }),

            socket.on('userAssign', (userAssign)=>{  
                console.log('userAssign has been triggered')
                groupCollection.findOne({ groupName : userAssign.groupName },  (err, data) =>{
                    if (err){
                        console.log(err)
                    } else {
                        newMemberSet = data.groupMembers
                        newMemberSet[data.groupMembers.length] = {username : userAssign.username}
                        console.log(newMemberSet)
                    }
                    groupCollection.updateOne({ groupName : userAssign.groupName },{$set:{groupMembers : newMemberSet}}, {upsertL: true},  (err, data) =>{
                        if (err){
                            console.log(err )
                        } else {
                            console.log('Members updated')
                        }
                    })
                })
            })
        })
    }
}
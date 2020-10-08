module.exports = function(db, app){
//A simple functionality to return the collection of users in the mongo database 
    app.get('/api/readUsers', function(req, res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) =>{
            if (err){
                console.log(err)
            } else {
                res.send(data)
            }
        })
    }) 
}
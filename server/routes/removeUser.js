module.exports = function(db, app, ObjectID){
    // Gets the id in mongo that is being requested for deletion in the route
    app.post('/api/remove', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        IdDelete = req.body.id
        const collection = db.collection('users');
        collection.deleteOne({id: IdDelete}, (err, doc) =>{
            if (err){
                console.log("Error: " + err)
            } else {
                collection.find({}).toArray((err, data) => {
                    res.send(data)
                    return data

                })
            }
        })
    })
}

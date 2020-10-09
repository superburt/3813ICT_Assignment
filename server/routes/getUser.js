module.exports = function(db, app){
//This functionality gets a single user from the user collection in the mongo database, according to the id inputted
    app.post('/api/getUser', function(req, res){
        IdUpdate = req.body.id

        const collection = db.collection('users');
        collection.findOne({id: IdUpdate} ,(err, data) =>{
            res.send(data)
        })
    })
}

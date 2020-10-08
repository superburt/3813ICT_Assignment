module.exports = function(db, app, ObjectID){
// This utilizes mongo database to match the request id to the stored values matching the same id in the database
    app.post('/api/updateUser', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        userID = req.body.id
        const collection = db.collection('users');
        collection.updateOne({ id : userID }, {$set:{username : req.body.username , pwd: req.body.pwd, email: req.body.email, role: req.body.role, imgSrc: req.body.imgSrc}}, {upsertL: true}, 
            (err, data) =>{
            if (err){
                console.log(err)
            } else {
                collection.findOne({id: userID} , (err, data) => {
                    res.send(data)
                    return {id : userID , username : req.body.username , pwd: req.body.pwd, email: req.body.email, role: req.body.role}
                })
            }
        })
    })
}
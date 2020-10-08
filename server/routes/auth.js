module.exports = function(db, app){
// This functionality simply lookds for the submitted email and password in the mongo database and returns the user data if its a match
// and if it does not match, it returns valid: "false", which in the component will prompt the user to log in
    app.post('/api/auth', function(req, res){
        const collection = db.collection('users');
        collection.findOne({email : req.body.email, pwd : req.body.pwd} ,(err, data) =>{
            
            if (data != null){
                res.send(data)
            } else {
                res.send({valid: "false"})
            }
        })
    })
}

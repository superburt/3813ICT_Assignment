module.exports = function(db, app, formidable){

// This function takes an image selected by a user and uploads it to the Images folder if it is valid
    app.post('/api/imgUpload', function(req, res){
        var form = new formidable.IncomingForm({uploadDir : '../src/assets/Images'});
        form.keepExtensions = true;
        
        form.on('error', (err)=>{
            res.send({
                result : "failed",
                data : {},
                numberOfImges : 0,
                message : "Could not upload your image. The error value is: " + err
            })
            throw err;
        })
        form.on('fileBegin' , (name, file)=>{
            file.path = form.uploadDir + "/" + file.name;
        })
        form.on('file', (field, file)=>{
            res.send({
                result : "OK",
                data : {"filename" : file.name, "size" : file.size},
                numberOfImages : 1,
                message : "Image upload was successful"
            })
        })
        form.parse(req);
    })
}
const {app} = require('./app')

const PORT = 9000;

app.listen(PORT, (err,req,res)=>{
    if(err){
        console.log("Couldnt connect to the server", {error: err})
    }else{
        console.log("Server running successfully")
    }
})
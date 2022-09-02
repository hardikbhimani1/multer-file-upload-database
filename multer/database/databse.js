const mongoose = require("mongoose")

const conn = mongoose.connect("mongodb://localhost:27017/image", {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err,connection)=>{
    if(err)throw err
    else{
        console.log("DB Connection Done")
    }
})  
module.exports = conn;

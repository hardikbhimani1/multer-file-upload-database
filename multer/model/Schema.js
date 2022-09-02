const mongoose = require("mongoose")

const userdata = new mongoose.Schema({
    fieldname :{type:String,required: true},
    originalname :{type: String, required: true },
    destination: {type: String, required: true },
    path:{type:String,require:true},
    size:{type: String,require:true},
    mimetype:{type:String,require:true}
})

const userModel = new mongoose.model("userdatas", userdata);

module.exports = userModel



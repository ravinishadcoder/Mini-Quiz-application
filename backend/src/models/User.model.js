const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    role:{type:String},
    email:{type:String},
    hash:{type:String}
},{
    versionKey:false
})

const User = mongoose.model("user",userSchema);

module.exports = User;
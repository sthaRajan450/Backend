const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testapp1")

module.exports=mongoose.model('user',mongoose.Schema({
    name:String,
    email:String,
    imageUrl:String
}))
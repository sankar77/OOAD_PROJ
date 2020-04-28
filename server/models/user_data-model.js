const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user_data = new Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    year:{type:String,required:true},
    email:{type:String,required:true},
    phone_no:{type:String,required:true},
    user_name:{type:String,required:true},
    password:{type:String,required:true},


},
{timestamps:true},

)
mod = mongoose.model('user_datas',user_data)
module.exports = mod
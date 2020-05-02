const mongoose = require('mongoose')
const Schema = mongoose.Schema

const custinfo = new Schema({
    Name:{type:String,required:true},
    Age:{type:String,required:true},
    Phone:{type:String,required:true},
    Email:{type:String,required:true},
    BookingId:{type:String,required:true},
},
{timestamps:true},

)



mod = mongoose.model('custinfos',custinfo)
module.exports = mod

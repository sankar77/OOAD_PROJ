const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bankdetails = new Schema({
    CardNumber:{type:String,required:true},
    ExpiryDate:{type:String,required:true},
    Amount:{type:String,required:true},
    Name:{type:String,required:true},
},
{timestamps:true},

)



mod = mongoose.model('bankdetails',bankdetails)
module.exports = mod

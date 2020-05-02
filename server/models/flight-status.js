const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flightdetails = new Schema({
    Source:{type:String,required:true},
    Destination:{type:String,required:true},
    start_time:{type:String,required:true},
    end_time:{type:String,required:true},
    price:{type:String,required:true},
    
},
{timestamps:true},

)



mod = mongoose.model('flightdetails',flightdetails)
module.exports = mod

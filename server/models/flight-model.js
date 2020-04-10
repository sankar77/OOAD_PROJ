const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flight = new Schema({
    source:{type:String,required:true},
    dest:{type:String,required:true},
    travel_time:{type:Number,required:true},

},
{timestamps:true},

)
mod = mongoose.model('flights',flight)
module.exports = mod
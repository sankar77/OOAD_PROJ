const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user_flight = new Schema({
    booking_num:{type:String,required:true},
    source:{type:String,required:true},
    destination:{type:String,required:true},
    start_time:{type:String,required:true},
    end_time:{type:String,required:true},
    food_option:{type:String,required:true},
    checkin_status:{type:Boolean,required:true},


},
{timestamps:true},

)
mod = mongoose.model('user_flights',user_flight)
module.exports = mod
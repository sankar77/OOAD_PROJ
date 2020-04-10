const flight = require('../models/flight-model')

createflight = (req,res)=>{
    const body = req.body
    console.log("Body")
    console.log(body)
    if(!body){
        return res.status(400).json({
            success:false,
            error:'must create a flight',
        })
    }
    
    const ft = new flight(body)
    if(!ft){
        return res.status(400).json({
            success:false,
            error:err,
        })
    }
    ft
    .save()
    .then(()=>{
        return res.status(201).json({
            success:true,
            id:ft._id,
            message:'flight created',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'flight not created!',
        })
    })
}
module.exports = createflight
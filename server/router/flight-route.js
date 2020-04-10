const express = require('express')
const flightctrl = require('../controller/flight-ctrl')
var request = require('request')
const flightmod = require('../models/flight-model')

var route = express.Router()
var app = express();

/*app.post('/dogs',function(req,res){
    var dog = req.body
    console.log(dog)
})
*/
//var request = require('request');

request.post(
    "http://localhost:3001/api/flight",
    { json:{source:'New York',dest:'San Francisco',travel_time:4}},
    function(error,response,body){
        if(!error && response.statusCode==200){

            console.log(body)
            
                }}
            )

    
    

            
    

/*request.post(
    "http://localhost:3001/dogs",
    { json: { name: 'charlie' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
*/

/*var myjsonobject = {"source":"New York","dest":"San Francisco","travel_time":4};
route = function router(){
    request({
    url:"http://localhost:3001/api/flight",
    method:"POST",
    json:true,
    body:myjsonobject
},function(error,response,body){
    console.log(error);
});
};*/

//router.post('/flight',flightctrl(myjsonobject).createflight)
module.exports = route
//router.use('/api/flight',flightctrl({"source":"New York","dest":"San Francisco","travel_time":4}).createflight)
//console.log("22")
//module.exports = router



/*var myJSONObject = { ... };
request({
    url: "http://josiahchoi.com/myjson",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    console.log(response);
});*/
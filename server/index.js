const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3001
const db = require('./db')
const mongoose = require('mongoose')
const axios = require('axios')

const flightrouter = require('./router/flight-route')
const flightcontroller = require('./controller/flight-ctrl')
const flight = require('./models/flight-model')

//console.log(mongo.version)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/api/flight', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    //res.send(req.body);
    //res.send(flightcontroller.createflight)
    var myData = new flight(req.body);
    
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });

    
        })
        
   app.get('/api/flight',function(req,res){
    //res.send('flight page')
    flight.find(function(err,myData){
        if(err){
            console.log("error");
        }
        else{
            mongoose.connection.close()
            res.writeHead(200, {'Content-Type': 'text/plain'});
            myData.forEach(function(dt){
                
                res.write(dt.source+"\n")
                console.log(dt.source)
            })

            res.send()
            
           
                
                }
                
         
           
   }

);
   })
//app.use('/api',flightrouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
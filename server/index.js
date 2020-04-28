const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3001
const db = require('./db')
const mongoose = require('mongoose')
const axios = require('axios')
var ObjectID = require('mongodb').ObjectID;

const flightrouter = require('./router/flight-route')
const flightcontroller = require('./controller/flight-ctrl')
const flight = require('./models/flight-model')
const user_flight = require('./models/user-flight-model')
const user_dt = require('./models/user_data-model')

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
    var ref_num = "A1BC234";
    var opt;
    var flag =0;
    var original_food_choice = "Asian Veg";//should have the original food choice in the database
    var status_checkin;
    app.post('/api/customer/checkin/done',function(req,res){
        status_checkin = req.body.checkin_status;
        user_flight.updateOne({booking_num:ref_num,checkin_status:false},{$set:{checkin_status:status_checkin}},function(err,result){
            if(err){
                console.log("There is an error during update")
            }
            else{

                console.log("Result")
                console.log(result)
            }
        })
        // user_flight.find({booking_num:ref_num},function(err,result){
        //     if(err){
        //         console.log("Error");
        //     }
        //     else{
        //         original_checkin_status = result[0]['checkin_status']
        //         console.log("Res")
        //         console.log((original_checkin_status));
        //     }
        // })
    })

    // app.get('/api/customer/checkin/done',function(req,res){
    //     user_flight.find({booking_num:ref_num},function(err,objs){
    //         if(err){
    //             console.log("error");
    //         }
    //         else{
    //           var val;
        
    //           console.log("Search Result")
    //           console.log(objs)
    //             mongoose.connection.close()
    //             var array1=[]
    //             // var list1=[]
    //             //res.writeHead(200, {'Content-Type': 'application/json'});
    //             if (objs.length==1){
    //               array1.push(objs[0])
    //             }
    //             else{
    //               objs.forEach(function(dt){
    //                 array1.push(dt)
    //               })
    //             }
    //             //console.log(val)
        
    //             console.log(array1)
    //             //res.write(array1)
    //             res.send(array1)
    //                 }
        
    // })
    // })
    var f_name;
    var l_name;
    var year;
    var email;
    var ph_num;
    var us_name;
    var pswd;
    var flag = 0;
    app.post('/api/registration',function(req,res){
        f_name = req.body.first_name;
        l_name = req.body.last_name;
        year = req.body.year;
        email = req.body.email;
        ph_num = req.body.phone_no;
        us_name = req.body.user_name;
        pswd = req.body.password;
        console.log("the request is",req.body);
        
        user_dt.find({user_name:us_name},function(err,result){
            if(err)
                console.log("there is an error");
            else{
                if(result.length){

                //flag = 1;
                console.log("Username already exists.Please create a new username");
                console.log("This is the result of the find query");
                console.log(result);
            }
            else{
                user_dt.create({first_name:f_name,last_name:l_name,year:year,email:email,phone_no:ph_num,user_name:us_name,password:pswd},function(err,result){
                    if(err)
                        console.log("There is an error during the insertion of the record")
                    else{
                        console.log("User successfully created.")
                    }
                })
            }
        }
        })
        if(flag==0){
            
        }
        
    })
    //  app.get('/api/registration',function(req,res){
        
    //  })
    app.post('/api/customer/update',function(req,res){
        
         console.log('the request body is',req.body);
         console.log("Ref_Num")
         console.log(ref_num);
         
         opt = req.body.food_option
         //console.log(typeof(original_food_choice))
         user_flight.updateOne({food_option:original_food_choice},{$set:{food_option:opt}},function(err,result){
            if(err){
                console.log("There is an error during update")
            }
            else{

                console.log("Result")
                console.log(result)
            }
        })
        user_flight.find({booking_num:ref_num},function(err,result){
            if(err){
                console.log("Error");
            }
            else{
                original_food_choice = result[0]['food_option']
                console.log("Res")
                console.log((original_food_choice));
            }
        })
        

        
     })
    //app.get('/api/customer/update',function(req,res){
        
    //})
    var ref_num_checkin;
    app.post('/api/customer/checkin',function(req,res){
        ref_num_checkin = req.body.num_checkin


    })
    app.get('/api/customer/checkin',function(req,res){
        user_flight.find({booking_num:ref_num_checkin},function(err,objs){
            if(err){
                console.log("error");
            }
            else{
              var val;
        
              console.log("Search Result")
              console.log(objs)
                mongoose.connection.close()
                var array1=[]
                // var list1=[]
                //res.writeHead(200, {'Content-Type': 'application/json'});
                if (objs.length==1){
                  array1.push(objs[0])
                }
                else{
                  objs.forEach(function(dt){
                    array1.push(dt)
                  })
                }
                //console.log(val)
        
                console.log(array1)
                //res.write(array1)
                res.send(array1)
                    }
        
    })
})
    app.post('/api/customer', function(req, res) {
        console.log('receiving data ...');
        console.log('body is ',req.body);
        //res.send(req.body);
        //res.send(flightcontroller.createflight)
        //var myData = new (req.body);
        
            ref_num=req.body.booking_num
            //flag = 1;
        
        
        //    food_option = req.body.food_option
            //flag = 0;
        
        //console.log("Ref")
        //console.log(ref_num)
        //console.log(typeof(ref_num.toString()))
        // myData.save()
        // .then(item => {
        // res.send("item saved to database");
        // })
        // .catch(err => {
        // res.status(400).send("unable to save to database");
        // });
    
        
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

app.get('/api/customer',function(req,res){
    
   
    user_flight.find({booking_num:ref_num},function(err,objs){
        if(err){
            console.log("error");
        }
        else{
          var val;
    
          console.log("Search Result")
          console.log(objs)
            mongoose.connection.close()
            var array1=[]
            // var list1=[]
            //res.writeHead(200, {'Content-Type': 'application/json'});
            if (objs.length==1){
              array1.push(objs[0])
            }
            else{
              objs.forEach(function(dt){
                array1.push(dt)
              })
            }
            //console.log(val)
    
            console.log(array1)
            //res.write(array1)
            res.send(array1)
                }
    
});
    
    
})

//app.use('/api',flightrouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
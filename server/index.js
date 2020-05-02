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
const flightdetails = require('./models/flight-status')
const custinfo = require('./models/custinfo')
const bankdetails=require('./models/bankdetails')
var nodemailer = require('nodemailer')
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
var flight_details;
var src;
var dst;
var data1;
var passengers;
var status;
var data2;
var passName;
var passAge;
var passPhone;
var passstart_time;
var passend_time;
var passBooking;
var passPrice;
var passSource;
var passDestination;
app.post('/api/payments',function(req,res){
  data1 = req.body
  console.log(req.body);
  passstart_time=data1['start_time'];
  passend_time=data1['end_time'];
  passSource=data1['source'];
  passDestination=data1['dest']
  console.log("data1 is ",data1);
  console.log(typeof(data1));
})
app.post('/api/custinfo',function(req,res){
  data2 = req.body
  console.log(req.body);
  console.log("data2 is ",data2);
  console.log(typeof(data2));
  console.log(data2['Name']);
  console.log(data2['Age']);
  console.log(data2['Phone']);
  console.log(data2['Email']);
  console.log(data2['BookingId']);
  passName=data2['Name']
  passAge=data2['Age']
  passPhone=data2['Phone']
  passBooking=data2['BookingId']
  custinfo.create({Name:data2['Name'],Age:data2['Age'],Phone:data2['Phone'],Email:data2['Email'],BookingId:data2['BookingId']},
  function(err,objs){
    if(err)
      console.log(err)
    else{
    console.log("find object is",objs);
  }
  }
//   custinformation.insert(JSON.stringify(data2),function(err,result){
//     if(err)
//      console.log(err);
//      else{
//        console.log("Result");
//        console.log(result);
//      }
// }
)
})
var pass_num;
app.post('/api/balance',function(req,res){
  data3 = req.body
  console.log(req.body);
  console.log("data3 is ",data3);
  console.log(typeof(data3));
  console.log(data3['CardNo']);
  console.log(data3['Cvv']);
  console.log(data3['Name']);
  console.log(data3['ExpiryDate']);
  console.log(data3['price']);
  console.log(data3['num_pas']);
  passPrice=data3['price']
  pass_num =data3['num_pas']
})
  app.get('/api/balance',function(req,res){
    bankdetails.find({CardNumber:data3['CardNo'],ExpiryDate:data3['ExpiryDate'],Name:data3['Name']},function(err,objs){
      if (err){
          console.log("error");
          //res.send("0");
        }
        if(objs.length==0){
          console.log("Invalid Credentials")
          res.send("3");
        }
      if(objs.length==1){
        var bankamount=objs[0]['Amount']
        var ticketprice=data3['price']
        bankamount=bankamount.substring(1)
        bankamount=parseInt(bankamount,10)
        ticketprice=ticketprice.substring(1)
        ticketprice=parseInt(ticketprice,10)
        if (ticketprice<=bankamount) {
          console.log("Ticket has been Booked");
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'flightrider43@gmail.com',
              pass: 'Flight123@'
            }
            });
            console.log("The passname is")
          console.log(passName);
          var mailOptions = {
            from: 'flightrider43@gmail.com',
            to: 'anu110594@gmail.com',
            subject: 'Ticket Confirmation',
            html: `<h1 style="color: #5e9ca0;">Ticket Details</h1>
            <table class="editorDemoTable">
            <thead>
            <tr>
            <td>Ticket Details</td>
            <td>Booking Details</td>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>Customer Name</td>
            <td>${passName}</td>
            </tr>
            <tr>
            <tr>
            <td>Age</td>
            <td>${passAge}</td>
            </tr>
              <tr>
            <td>Source</td>
            <td>${passSource}</td>
            </tr>
              <tr>
            <td>Start Time</td>
            <td>${passstart_time}</td>
            </tr>
              <tr>
            <td>Destination</td>
            <td>${passDestination}</td>
            </tr>
              <tr>
            <td>End Time</td>
            <td>${passend_time}</td>
            </tr>
              <tr>
            <td>No of Passengers</td>
            <td>${pass_num}</td>
            </tr>
            <tr>
          <td>Ticket Price</td>
          <td>${passPrice}</td>
          </tr>
              <tr>
            </tbody>
            </table>

            <h2 style="color: #5e9ca0;">Thank You for choosing FlightRider.com</h2>`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.send("1");
        }
        else{
          console.log("Insufficient funds");
          res.send("2");
        }
      }
  })
})

//   custinformation.insert(JSON.stringify(data2),function(err,result){
//     if(err)
//      console.log(err);
//      else{
//        console.log("Result");
//        console.log(result);
//      }
// }
//)
//})
app.get('/api/payments',function(req,res){
  var array2=[]
  // var list1=[]
  //res.writeHead(200, {'Content-Type': 'application/json'});
      array2.push(data1)
  // }
  //console.log(val)

  console.log(array2)
  //res.write(array1)
  // res.send(array2)
  res.send(array2)
})
var num_pas;
app.post('/api/flight', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    src =req.body.source
    dst = req.body.dest
    passengers=req.body.passengers
    status=req.body.status
    var myData = new flight(req.body);
    console.log("status is",req.body.status)
    console.log("no of passengers",req.body.passengers)
    console.log(myData)
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
      })

      var ref_num = "A1BC236";
        var opt;
        var flag =0;
        var original_food_choice = "Vegan";//should have the original food choice in the database
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
flightdetails.find({Source:src,Destination:dst},function(err,objs){
    if(err){
        console.log("error");
    }
    else{
      var val;
      var val1;
      var totalcost;
      console.log("Search Result")
      console.log(objs)
        mongoose.connection.close()
        var array1=[]
        // var list1=[]
        //res.writeHead(200, {'Content-Type': 'application/json'});
        passengers=parseInt(passengers,10)
        console.log("pass is ",passengers)
        if (objs.length==1){

          val1=objs[0]['price']
          val1=val1.substring(1)
          val1=parseInt(val1,10)
          if (status=="Business"){
              totalcost=(val1*passengers)+1000;
          }
          else{
              totalcost=val1*passengers;
          }

          totalcost=totalcost.toString()
          // console.log(totalcost);
          var sym='$'
          val1=sym.concat(totalcost)
          objs[0]['price']=val1
          array1.push(objs[0])
        }
        else{
          objs.forEach(function(dt){
            val1=dt['price']
            val1=val1.substring(1)
            val1=parseInt(val1,10)
            if (status=="Business"){
                totalcost=(val1*passengers)+1000;
            }
            else{
                totalcost=val1*passengers;
            }
            totalcost=totalcost.toString()
            // console.log(totalcost);
            var sym='$'
            val1=sym.concat(totalcost)
            dt['price']=val1
            array1.push(dt)
          })
        }
        //console.log(val)

        console.log("array1 data is",array1)
        //res.write(array1)
        res.send(array1)
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


   // app.get('/api/custinfo',function(req,res){
   //   console.log("data2 is ",data2);
   //   custinfo.insertOne(data2,function(err,result){
   //     if(err)
   //      console.log(err);
   //      else{
   //        console.log("Result");
   //        console.log(result);
   //      }
   // }
   // );
   // })

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

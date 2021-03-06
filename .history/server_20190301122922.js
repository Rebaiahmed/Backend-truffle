const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
var moment = require('moment')
var socket = require('socket.io');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');


var services = require('./connection/services');
var UserServices = require('./connection/UserService');
const truffle_connect = require('./connection/app.js');


/*services.SendSmsnotification()
.then(function(data){

  console.log('data' + data);

}).catch(function(err){
  console.log('err' + err);
})*/
mongoose.connect('mongodb://localhost/multimedia_database');

let user ={
  'firstName': 'Ahmed',
  'lastName': 'Ahmed',
  'email': 'ahmed@mail.com',
  'phone': '20140428' ,
  'address': 'Tunis rue zahrouni 2051',
  'role' : 'Farmer',
  'password' :'ahmedrebai'
}

UserServices.signup(user)

.then(function(data){

console.log('data' + JSON.stringify(data));

}).catch(function(err){
  console.log('err' + err);
})


//____connect with mongodb____________//

//mongoose.connect('mongodb://localhost/supplychain');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});




app.post('/getBalance', (req, res) => {
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){
      // get list of all accounts and send it along with the response
      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoin', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});




//________method to create Porduct_______________//

app.post('/createProduct', (req, res) => {
  console.log("**** POST /create Product ****");
  console.log(req.body);

  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/
 /* let product = req.body.product

  console.log('produc is' + product);*/

  truffle_connect.CreateProduct( (balance) => {
    res.send(balance);
  });
});




//________method to get Products_______________//

app.get('/products', (req, res) => {
  console.log("**** Get Products****");


  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getProducts( (balance) => {
    res.json(balance);
  });
});











//_______________________________//
app.post('/login', (req, res) => {
  console.log("****login chekc if the user is connected****");



res.json("mrigal aatw nchof hall ")



});








//________method to get Products_______________//

app.post('/createAccount', (req, res) => {
  console.log("****create account method****");
 //:siwtch role we will invoke method**********//
 let role = req.body.role ;

 let firstName = req.body.firstName ;
 let lastName = req.body.lastName ;
 let email = req.body.email;
 let phone= req.body.phone ;
let adress = req.body.address ;



let  activity = req.body.activity ;
let companyName = req.body.companyName ;

/*
farmerdata.firstName, farmerdata.lastName,
      farmerdata.email,farmerdata.phone,farmerdata.activity*/
let farmer ={
  'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'activity': activity
}


//____declare Supplier_____//

let supplier ={
   'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'companyName': companyName
}


//____declare retailer____________//
let retailer ={
   'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'companyName': companyName
}


//__________the generale user____________//

let user ={
    'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'address': adress,
  'role' : role
}


role  ="Farmer" ;



UserServices.signup(user)

.then(function(data){

services.SendSmsVerification(data.secretcode)
.then(data=>{


//___________Now call the Smart contract Add method__________//

switch(role) {
  case "Farmer":
    // code block
    truffle_connect.CreateFarmer(farmer, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
      console.log('the result returned is' + balance);

      res.json({"smartcontarct" :balance, "userData": userData});
    });
    break;
  case "Supplier":
    // code block
    truffle_connect.CreateSupplier(supplier, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
     res.json({"smartcontarct" :balance, "userData": userData});
    });
    break;
  default:
    // code block
    truffle_connect.CreateRetailer(retailer, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
     res.json({"smartcontarct" :balance, "userData": userData});
    });

}

}).catch(function(err){
   console.log('err seidngs sms' + err);
   res.status(500).json(err);
})

//_________________________//


}).catch(function(err){

  console.log('err' + err);
  res.status(400).json(err);
})









});















//________________________________________//

//________method to get Products_______________//

app.post('/createAccount1', (req, res) => {
  console.log("****create account method****");
 //:siwtch role we will invoke method**********//
 let role = req.body.role ;

 let firstName = req.body.firstName ;
 let lastName = req.body.lastName ;
 let email = req.body.email;
 let phone= req.body.phone ;
let adress = req.body.address ;



let  activity = req.body.activity ;
let companyName = req.body.companyName ;

/*
farmerdata.firstName, farmerdata.lastName,
      farmerdata.email,farmerdata.phone,farmerdata.activity*/
let farmer ={
  'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'activity': activity
}


//____declare Supplier_____//

let supplier ={
   'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'companyName': companyName
}


//____declare retailer____________//
let retailer ={
   'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'companyName': companyName
}


//__________the generale user____________//

let user ={
    'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'address': adress,
  'role' : role
}


role  ="Farmer" ;





//___________Now call the Smart contract Add method__________//

switch(role) {
  case "Farmer":
    // code block
    truffle_connect.CreateFarmer(farmer, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
      console.log('the result returned is' + balance);

      res.json({"smartcontarct" :balance});
    });
    break;
  case "Supplier":
    // code block
    truffle_connect.CreateSupplier(supplier, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
     res.json({"smartcontarct" :balance});
    });
    break;
  default:
    // code block
    truffle_connect.CreateRetailer(retailer, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
     res.json({"smartcontarct" :balance, "userData": userData});
    });

}










});















//________method to move Prodyct from Grower to Supplier_______________//

app.post('/producttosupplier', (req, res) => {
  console.log("**** POST /create Product ****");
  console.log(req.body);

  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.ProductToSupplier( (balance) => {
    res.send(balance);
  });
});


//________method to move Product from Supplier to Retailer_______________//

app.post('/supplier_retailer', (req, res) => {
  console.log("**** POST /create Product ****");
  console.log(req.body);

  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.ProductToRetailer( (balance) => {
    res.send(balance);
  });
});






//________method to get Suppliers_______________//

app.get('/suppliers', (req, res) => {
  console.log("**** Get Suppliers****");


  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getSuppliers( (balance) => {
    res.json(balance);
  });
});


//________method to get Retailers_______________//

app.get('/retailers', (req, res) => {
  console.log("**** Get Suppliers****");


  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getRetailers( (balance) => {
    res.json(balance);
  });
});




//________method to get Products for the grower_______________//

app.get('/products/grower', (req, res) => {
  console.log("**** POST /create Product ****");
  console.log(req.body);

  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getProductsGrower(growerId, (balance) => {
    res.send(balance);
  });
});



//________method to get Products for the supplier_______________//

app.get('/products/supplier', (req, res) => {
  console.log("**** POST /create Product ****");
  console.log(req.body);

  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getProductsGrower(growerId, (balance) => {
    res.send(balance);
  });
});


//________method to get Products for the retailer_______________//

app.get('/products/retailer', (req, res) => {
  console.log("**** POST /create Product ****");
  console.log(req.body);

  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getProductsRetailer(growerId, (balance) => {
    res.send(balance);
  });
});







var server = app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  console.log("Express Listening at http://localhost:" + port);

});




//_____initialize socket to be used for realtime functions _______________//
io = socket(server);


//______open connection________
io.on('connection', (socket) => {


console.log('there is someone connected ')

// io.emit('RECEIVE_MESSAGE', msg);





})
//____end of socket connection










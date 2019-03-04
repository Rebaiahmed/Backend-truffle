const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
var moment = require('moment')
var socket = require('socket.io');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contract = require('truffle-contract');

var services = require('./connection/services');
var UserServices = require('./connection/UserService');
const truffle_connect = require('./connection/app.js');

const food_artifact = require('./build/contracts/Food.json');
var Food = contract(food_artifact);
/*services.SendSmsnotification()
.then(function(data){

  console.log('data' + data);

}).catch(function(err){
  console.log('err' + err);
})*/








mongoose.connect('mongodb://localhost/supplychai_nmeta_data');

let user ={
  'firstName': 'Ahmed',
  'lastName': 'Ahmed',
  'email': 'ahmed@mail.com',
  'phone': '20140428' ,
  'address': 'Tunis rue zahrouni 2051',
  'role' : 'Farmer',
  'password' :'ahmedrebai'
}

/*UserServices.signup(user)

.then(function(data){

console.log('data' + JSON.stringify(data));

}).catch(function(err){
  console.log('err' + err);
})*/


//____connect with mongodb____________//

//mongoose.connect('mongodb://localhost/supplychain');


var cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200/'
}

app.use(cors());

app.use(cors(corsOptions))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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


  let product ={
    'title' : req.body.title  ,
    'category' :req.body.type ,
    'hardate' : req.body.hardate ,
    'city' : req.body.city ,
    'quantity' : req.body.quantity ,
    'owner' : req.body.owner
  }
  console.log('produc tis' + JSON.stringify(product));

  truffle_connect.CreateProduct(product, (balance) => {
    res.json(balance);
  });
});






//________method to create Porduct_______________//

app.post('/producttosupplier', (req, res) => {
  console.log("**** POST /create Product ****");


  let product ={
    'idProduct' : req.body.idProduct  ,
    'idOwner' :req.body.idOwner ,
    'shipdate' : req.body.shipdate ,
    'city' : req.body.city ,
    'idReciver' : req.body.idReciver
  }
  console.log('produc tis' + JSON.stringify(product));

  truffle_connect.SendProductoSupplier(product, (balance) => {
    res.json(balance);
  });
});





//________method to get Products_______________//

app.get('/products', (req, res) => {
  console.log("**** Get Products****");


  /*let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;*/

  truffle_connect.getProducts( (balance) => {

    Promise.all(balance)
    .then((results) => {
      console.log('esult sprodcuts' + JSON.stringify(results));
     res.json(results)
    })
    .catch((e) => {
        // handle errors here
        res.json(e);
    });
  });
});











//_______________________________//
app.post('/login', (req, res) => {
  console.log("****login chekc if the user is connected****");
var email = req.body.email ;
var password = req.body.password ;




res.json("mrigal aatw nchof hall ")



});



//_______________________________//
app.get('/products/history/:id', (req, res) => {
  console.log("********");



//__get the id
var id = req.params.id;
console.log('id' + id);
truffle_connect.getProductState(id, (balance) => {
  //___execute the metod to send QR CODE with user data_____//
 res.json({"producthistory" :balance});
});



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
let retailercompanyName = req.body.retailercompanyName ;

/*
farmerdata.firstName, farmerdata.lastName,
      farmerdata.email,farmerdata.phone,farmerdata.activity*/
let farmer ={
  'username' : firstName + '_' + lastName,
  'activity': activity,
  'adress': adress
}


//____declare Supplier_____//

let supplier ={
  'username' : firstName + '_' + lastName,
  'adress': adress,
  'companyName': companyName
};


//____declare retailer____________//
let retailer ={
  'username' : firstName + '_' + lastName,
  'adress': adress,
  'companyName': retailercompanyName
};


//__________the generale user____________//

let user ={
    'firstName': firstName,
  'lastName': lastName,
  'email': email,
  'phone': phone ,
  'address': adress,
  'role' : role
}


//role  ="Farmer" ;




UserServices.signup(user)

.then(function(data){

  console.log('eeheheh')

/*services.SendSmsVerification(data.secretcode,data.phone)
.then(data2=>{*/


//___________Now call the Smart contract Add method__________//

switch(role) {
  case "Farmer":
    // code block
    console.log('farmer ')
    truffle_connect.CreateFarmer(farmer, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
      //console.log('the result returned is' + balance);

      res.json({"smartcontarct" :balance, "userData": data});
    });
    break;
  case "Supplier":
    console.log('add suuplier')
    // code block
    truffle_connect.CreateSupplier(supplier, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
     res.json({"smartcontarct" :balance, "userData": data});
    });
    break;
  default:
    // code block
    console.log('add retailer')
    truffle_connect.CreateRetailer(retailer, (balance) => {
      //___execute the metod to send QR CODE with user data_____//
     res.json({"smartcontarct" :balance, "userData": data});
    });

}

/*}).catch(function(err){
   console.log('err seidngs sms' + err);
   res.status(500).json(err);
})*/

//_________________________//


}).catch(function(err){

  console.log('err saving user' + err);
  res.status(400).json(err);
})


})

















/*truffle_connect.CreateFarmer("aa", (balance) => {
  //___execute the metod to send QR CODE with user data_____//
  console.log('the result returned is' + balance);

  //res.json({"smartcontarct" :balance});
});*/





//________________________________________//

//________method to get Products_______________//






//________method to get Suppliers_______________//

app.get('/suppliers', (req, res) => {

  truffle_connect.getSuppliers((balance) => {
    //___execute the metod to send QR CODE with user data_____//
    console.log('the result returned is' + balance);

  Promise.all(balance)
  .then((results) => {
   res.json(results)
  })
  .catch((e) => {
      // handle errors here
      res.json(e);
  });

    //res.json({"smartcontarct" :balance, "userData": data});
  });

});


//________method to get Retailers_______________//

app.get('/retailers', (req, res) => {


  truffle_connect.getRetailers((balance) => {
    //___execute the metod to send QR CODE with user data_____//
    console.log('the result returned is' + balance);

  Promise.all(balance)
  .then((results) => {
   res.json(results)
  })
  .catch((e) => {
      // handle errors here
      res.json(e);
  });

    //res.json({"smartcontarct" :balance, "userData": data});
  });


});




/*truffle_connect.CreateFarmer("aa", (balance) => {
  //___execute the metod to send QR CODE with user data_____//
  //console.log('the result returned is' + balance);

  res.json({"smartcontarct" :balance, "userData": data});
});*/














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

this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var self = this;
//console.log('eheh' +self.web3.currentProvider);

// Bootstrap the MetaCoin abstraction for Use.
Food.setProvider(self.web3.currentProvider);

self.web3.eth.getAccounts(function(err, accs) {
  if (err != null) {
    console.log("There was an error fetching your accounts.");
    return;
  }

  if (accs.length == 0) {
    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    return;
  }


  self.accounts = accs;
  self.account = self.accounts[2];

 // console.log('defautlacount' + self.web3.eth.coinbase);
self.web3.eth.defaultAccount=self.web3.eth.coinbase;
  var food;
  Food.deployed().then(function(instance) {
    food = instance;
    //console.log('instance is' + food.farmers[0]);
    //console.log(self.web3.eth.defaultAccount);


    const allEvents = food.allEvents({
      fromBlock: 0,
      toBlock: 'latest'
    });
    allEvents.watch((err, res) => {

      console.log('events')
      console.log(err, res);
      if(err) {
        console.log('err subsciption to event' + err);
      }

    })



})//____end of getAccounts__________//


}) //________________//



})
//____end of socket connection





//____________when tehre is error________//

//___________truffle migrate --reset




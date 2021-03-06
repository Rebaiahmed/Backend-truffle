const contract = require('truffle-contract');
const Web3 = require('web3');
const metacoin_artifact = require('../build/contracts/MetaCoin.json');

const food_artifact = require('../build/contracts/Food.json');

const farmer_artifcat = require('../build/contracts/FarmerContract.json');
/*const supplier_artifact = require('../build/contracts/Supplier.json');
const retailer_artifact = require('../build/contracts/Supplier.json');*/
const product_artifact = require('../build/contracts/Product.json');


var MetaCoin = contract(metacoin_artifact);

var Food = contract(food_artifact);

var Farmer = contract(farmer_artifcat);
/*var Supplier = contract(supplier_artifact);
var Retailer = contract(retailer_artifact);*/
var Products = contract(product_artifact);


var services = require('./UserService.js');
var smsservce =  require('./services.js');
var mongoose = require('mongoose');

console.log('shh' + smsservce );



//0xD1589bd965c4718e0C27918539F53FC81ad44a60
/*
 Deploying 'Food'
   ----------------
   > transaction hash:    0x328597336af438efb0722f1bbde6fd3bb2c013edddcacb34abd9f81c03f0c7e7
   > Blocks: 0            Seconds: 0
   > contract address:    0xD1589bd965c4718e0C27918539F53FC81ad44a60
   > account:             0x58a497D52309c1471996EE793C2dffd9a2A9B921
   > balance:             99.94141786
   > gas used:            483124
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00966248 ETH
*/



module.exports = {

  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },

//_______________________________________________//



  refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },

//_____________________________________________________//




  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
,


//___________________________________________//


CreateProduct: function( product,callback) {


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




       return food.getProducsNbr({from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {


      console.log('produc tis' + JSON.stringify(product));
      //callback("success");
  return food.addProduct(product.title,product.category,
    product.hardate,product.city,product.quantity,product.owner,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    .then(function(data2){

  console.log('curent nbr' + data);
  callback(Number(data)+1);
    }).catch(function(err){
      console.log('err adding product' + JSON.stringify(err));
    })
  //_____________now add the new farmer______________//









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })

},






//___________________________________________//


SendProductoSupplier: function( product,callback) {


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


      console.log('product' + JSON.stringify(product));
    






       return food.ship(product.idProduct,product.idOwner,
        product.idReciver,product.shipdate,0,product.city,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {
   
      var id = mongoose.Types.ObjectId('5c7d43f52c4495523868c0e8');

      console.log('produc to supplier ' + JSON.stringify(data));
      
      
        var data2 = {
          'idUser':""+ product.idReciver,
          'description': product.farmerName +" sent you " +product.productName,
          'farmerName' :  product.farmerName,
          'produitName': product.productName

        }

        services.addNotication (data2)
        .then (function(result){

          console.log('result ship ' + result);
          var io = global._io
          console.log('send reat')
          io.emit('RECEIVE_Notifcation',{'data': data2 })

          smsservce.SendSmsnotification("aa",20140428)
          .then(function(datasms){
            console.log('sms notf' + JSON.stringify(datasms));
            callback(data);

          }).catch(function(err){
          console.log('er' + err);
          })




         
            // callback(product);
        }).catch(function(err3){
          console.log('errr'+ err3);
        })                            

        
  //_____________now add the new farmer______________//









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })

},






//______________Create a Farmer________________//



CreateFarmer: function(farmerdata, callback) {


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




       return food.getCompaniesNbr(0,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {


      console.log('data is' + JSON.stringify(farmerdata));
      //callback("success");
  return food.addFarmer(farmerdata.activity,farmerdata.adress,
    farmerdata.username,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    .then(function(data2){

    console.log('added with success !')
  callback(Number(data)+1);
    }).catch(function(err){
      console.log('err adding farmer' + JSON.stringify(err));
    })
  //_____________now add the new farmer______________//









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })



},


//______________Create a Supplier________________//



CreateSupplier: function(supplierdata, callback) {


  this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var self = this;


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





       return food.getCompaniesNbr(1,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {

       console.log('current nbr' + data);

      //callback("success");
  return food.addSupplier(supplierdata.companyName,supplierdata.adress,supplierdata.username,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    .then(function(data2){


     callback(Number(data)+1);
    }).catch(function(err){
      console.log('err adding retailer' + JSON.stringify(err));
    })
  //_____________now add the new farmer______________//









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })



},







//______________Create a Retailer________________//





CreateRetailer: function(retailerdata, callback) {


  this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var self = this;


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





       return food.getCompaniesNbr(2,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {

       console.log('current nbr' + JSON.stringify(retailerdata));

      //callback("success");
  return food.addRetailer(retailerdata.companyName,retailerdata.adress,retailerdata.username,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    .then(function(data2){

  console.log('heheheh data 1' +  data + JSON.stringify(data2));
     callback(Number(data)+1);
    }).catch(function(err){
      console.log('err adding retailer' + JSON.stringify(err));
    })
  //_____________now add the new farmer______________//









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })



},







//_____________List of Suppliers___________________//


 getSuppliers: function(callback) {


  this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var self = this;


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





       return food.getCompaniesNbr(1,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {

       console.log('current nbr' + data);

       var list =[];

       for(var i=0;i<Number(data);i++)
       {
         console.log('index' + i);
        var promise = food.getCompanyById(i+1,1,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    list.push(promise)

       }//___end for



      callback(list);
  /*return food.addRetailer("Magasin ",{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    .then(function(data2){

  console.log('heheheh data 1' +  data + JSON.stringify(data2));
     callback(Number(data)+1);
    }).catch(function(err){
      console.log('err adding retailer' + JSON.stringify(err));
    })*/
  //_____________now add the new farmer______________//









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })



},













//_____________List of Retailers___________________//


getRetailers: function(callback) {


  this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var self = this;


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





       return food.getCompaniesNbr(2,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {

       console.log('current nbr' + data);

       var list =[];

       for(var i=0;i<Number(data);i++)
       {
         console.log('index' + i);
        var promise = food.getCompanyById(i+1,2,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    list.push(promise)

       }//___end for



      callback(list);
  /*return food.addRetailer("Magasin ",{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    .then(function(data2){

  console.log('heheheh data 1' +  data + JSON.stringify(data2));
     callback(Number(data)+1);
    }).catch(function(err){
      console.log('err adding retailer' + JSON.stringify(err));
    })*/










    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })



},




//________________Get the product current state_________//



//_____________List of Retailers___________________//


getProductState: function(id,callback) {



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
    console.log(self.web3.eth.defaultAccount);




     return food.getProductHistory(id,{from:self.web3.eth.defaultAccount,
      gas:3000000 });


  }).then(function(data2) {

    console.log('data 2' + JSON.stringify(data2.length 
      ) + '' + new Date(data2[0]).toLocaleDateString("en-US"));

      //new Date(UNIX_Timestamp * 1000);

      let obj ={
        'hardate' : data2[0],
        'shipdate' : data2[1],
       'retailerdate' : data2[2],
       'FarmerAdress': data2[3] ,
       'supplierAddress': data2[4],
       'RetailerAddress' : data2[5],
       'idSupplier' : data2[6],
       'idRetiler' : data2[7],
       'idFarmer' : data2[8]
       }
      

      
   //callback(data2);

   food.getCompanyById(data2[8],0)
       .then(function(farmer){
      
        console.log('farme is' + JSON.stringify(farmer));


        food.getCompanyById(data2[6],1)
       .then(function(supplier){
        console.log('supplier' + JSON.stringify(supplier));

        //__________get the retailer________________//

        food.getCompanyById(data2[7],2)
        .then(function(retailer){
         console.log('retaler' + JSON.stringify(retailer));

         //____________________________//
         callback({'farmerName': farmer[3],'farmerLocation': farmer[2],'farmerActivity': farmer[1],
         'supplierName' : supplier[3] ,'supplierLocation' : supplier[2] ,'supplierActivity' : supplier[1] ,
         'retailerName': retailer[3],'retailerLocation': retailer[2],'retailerActivity': retailer[1],
         'product': data2});

        }).catch(function(err){
          console.log('err geeting retailer' +err);
        })
      //_____________________________________________//


      }).catch(function(err){
        console.log('err geeting supplier' +err);
      })



       }).catch(function(err){
         console.log('err geeting farmer' +err);
       })







  }).catch(function(e) {
    console.log(e);
    //callback("ERROR 404");
  });//____end catch getNbr

})



},




//_____________List of Retailers___________________//


getProducts: function(callback) {


  this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var self = this;


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





       return food.getProducsNbr({from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {

       console.log('current nbr' + data);

       var list =[];
   //Number(data)
       for(var i=0;i<1;i++)
       {
         console.log('index' + i);
        var promise = food.getProductCurrentState(i+1,{from:self.web3.eth.defaultAccount,
    gas:3000000 })
    list.push(promise)
    /*list[0]
    .then(function(data){
      console.log('' + JSON.stringify(data));
    }).catch(function(er){

    })*/
  

       }//___end for

console.log('lists is' + JSON.stringify(list));

      callback(list);
 









    }).catch(function(e) {
      console.log(e);
      //callback("ERROR 404");
    });//____end catch getNbr

  })



},






}





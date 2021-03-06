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



      const allEvents = food.allEvents({
        fromBlock: 0,
        toBlock: 'latest'
      });
      allEvents.watch((err, res) => {

        console.log('events')
        console.log(err, res);
      })



  console.log('prod' + JSON.stringify(product));


       return food.ship(product.idProduct,product.idOwner,
        product.idReciver,product.shipdate,0,product.city,{from:self.web3.eth.defaultAccount,
        gas:3000000 });


    }).then(function(data) {


      console.log('produc to supplier ' + JSON.stringify(data));
      //callback("success");
     callback(product);
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
      console.log(self.web3.eth.defaultAccount);




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




     return food.getProductCurrentState(1,{from:self.web3.eth.defaultAccount,
      gas:3000000 });


  }).then(function(data) {

    //console.log('currentProduc' +  JSON.stringify(data[9]));
    //callback("success");
return food.getCompanyById(Number(data[9]),0,{from:self.web3.eth.defaultAccount,
  gas:3000000 })
  .then(function(data2){

console.log('faleh howa' +  data2 + 'prodit howa' + data);
//callback(Number(data)+1);
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

       for(var i=0;i<Number(data);i++)
       {
         console.log('index' + i);
        var promise = food.getProductCurrentState(i+1,{from:self.web3.eth.defaultAccount,
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






}





const contract = require('truffle-contract');

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


CreateProduct: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);


  self.web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    console.log('accs' + accs[0]);
    self.accounts = accs;
    self.account = self.accounts[2];

    console.log('defautlacount' + self.web3.eth.coinbase);
  self.web3.eth.defaultAccount=self.web3.eth.coinbase;
    var food;
    Food.deployed().then(function(instance) {
      food = instance;
      console.log('instance is' + food)
      return food.addProduct("Fruits", "Orange","111111111111",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

  });


},












//___________________________________________//


getProductsGrower: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);






    var food;
    Food.deployed().then(function(instance) {
      food = instance;

      return food.getProductsGrower("GrowerId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

},




//__________List of Prodycs to Supplier_____________//


getProductsSupplier: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);

    var food;
    Food.deployed().then(function(instance) {
      food = instance;

      return food.getProductsSupplier("SupplierId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

},



//__________List of Prodycs to Supplier_____________//


getProductsRetailer: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);

    var food;
    Food.deployed().then(function(instance) {
      food = instance;

      return food.getProductsRetailer("RetailerId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

},




//__________List of Prodycs to Supplier_____________//


getProductClient: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);

    var food;
    Food.deployed().then(function(instance) {
      food = instance;

      return food.getProductClient("ProductId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

},



//__________List of Prodycs to Supplier_____________//


ProductToRetailer: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);

    var food;
    Food.deployed().then(function(instance) {
      food = instance;

      return food.ship("ProductId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

}
,

//__________function to Porudct to Supplier__________//

ProductToSupplier: function( callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Food.setProvider(self.web3.currentProvider);

    var food;
    Food.deployed().then(function(instance) {
      food = instance;

      return food.ship("ProductId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

},



//______________Create a Farmer________________//



CreateFarmer: function(farmerdata, callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Farmer.setProvider(self.web3.currentProvider);

    var farmer;
    Farmer.deployed().then(function(instance) {
      farmer = instance;

      return farmer.ship("ProductId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });

},



//______________Create Supplier__________________//


CreateSupplier: function(supplierdata, callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Supplier.setProvider(self.web3.currentProvider);

    var supplier;
    Supplier.deployed().then(function(instance) {
      supplier = instance;

      return supplier.ship("ProductId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR" + e);
    });

},











//______________Create Retailer__________________//


CreateRetailer: function(retailerdata, callback) {
  var self = this;

  // Bootstrap the MetaCoin abstraction for Use.
  Retailer.setProvider(self.web3.currentProvider);

    var retailer;
    Retailer.deployed().then(function(instance) {
      retailer = instance;

      return retailer.ship("ProductId",{from:self.web3.eth.defaultAccount,
        gas:3000000 });
    }).then(function() {
      console.log('success')
      callback("success");
      /*self.refreshBalance(sender, function (answer) {
        callback(answer);
      });*/
    }).catch(function(e) {
      console.log(e);
      callback("ERROR" + e);
    });

},





}

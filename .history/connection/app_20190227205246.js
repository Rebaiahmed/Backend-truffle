const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');

const food_artifact = require('../build/contracts/Food.json');

var MetaCoin = contract(metacoin_artifact);

var Food = contract(food_artifact);


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

    var food;
    Food.deployed().then(function(instance) {
      food = instance;
      return food.addProduct("Fruits", "Orange","111111111111",accs[0]);
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


}




}

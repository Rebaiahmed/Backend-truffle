const contract = require('truffle-contract');
const Web3 = require('web3');


const food_artifact = require('../build/contracts/Food.json');



var Food = contract(food_artifact);

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
    console.log(self.web3.eth.defaultAccount);
     var data = food.getProductHistory(1

      ,{from:self.web3.eth.defaultAccount,
      gas:3000000 });


  })

})



/*
then(function(data) {
    console.log("data returend" +JSON.stringify(data));
    //callback("success");

  }).catch(function(e) {
    console.log(e);
    //callback("ERROR 404");
  });*/

const contract = require('truffle-contract');
const Web3 = require('web3');


const food_artifact = require('../build/contracts/Food.json');



var Food = contract(food_artifact);

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


    //_____________chekc the event listen to events_____//

    const allEvents = food.allEvents({
      fromBlock: 0,
      toBlock: 'latest'
    });
    allEvents.watch((err, res) => {
      console.log(err, res);
    });

//____________________________//

return food.ship(1,1,1,0000,0,"Tunis",{from:self.web3.eth.defaultAccount,
  gas:3000000 });

}).then(function(result){

  console.log('result ship' + result);

}).catch(function(err3){
  console.log('errr'+ err3);
})






     /*return food.getProductCurrentState(1,{from:self.web3.eth.defaultAccount,
      gas:3000000 });


  }).then(function(data) {

    //console.log('currentProduc' +  JSON.stringify(data[9]));
    //callback("success");
/*return food.getCompanyById(Number(data[9]),0,{from:self.web3.eth.defaultAccount,
  gas:3000000 })
  .then(function(data2){

console.log('faleh howa' +  data2 + 'prodit howa' + data);
//callback(Number(data)+1);

//_____now get the curent hisotry____//

/*return food.getProductHistory(1,{from:self.web3.eth.defaultAccount,
  gas:3000000 })

  .then(function(data3){
  console.log('data3 state ' + JSON.stringify(data3));

  }).catch(function(err3){
    console.log('err3' + err3);
  })*/










  /*}).catch(function(err){
    console.log('err adding farmer' + JSON.stringify(err));
  })*/
//_____________now add the new farmer______________//









  /*}).catch(function(e) {
    console.log(e);
    //callback("ERROR 404");
  });//____end catch getNbr*/

})



})



//ship(1,1,2,201235,0,"Tunis",
//getProductHistory(1

//getProductCurrentState(1

//addProduct("Légumes","Orange","1010123","Tunis",0,1

/*
then(function(data) {
    console.log("data returend" +JSON.stringify(data));
    //callback("success");

  }).catch(function(e) {
    console.log(e);
    //callback("ERROR 404");
  });*/


  /*Food.at(0x58c7F881D927c6BD4effA328d371D53a463E5C1A).then(function(instance) {
    coin = instance;


    console.log('instance ' + coin);
    // Make a transaction that calls the function `sendCoin`, sending 3 MetaCoin
    // to the account listed as account_two.
    //return coin.sendCoin(account_two, 3, {from: account_one});
  })/*.then(function(result) {
    // This code block will not be executed until truffle-contract has verified
    // the transaction has been processed and it is included in a mined block.
    // truffle-contract will error if the transaction hasn't been processed in 120 seconds.

    // Since we're using promises, we can return a promise for a call that will
    // check account two's balance.
    return coin.balances.call(account_two);
  }).then(function(balance_of_account_two) {
    alert("Balance of account two is " + balance_of_account_two + "!"); // => 3

    // But maybe too much was sent. Let's send some back.
    // Like before, will create a transaction that returns a promise, where
    // the callback won't be executed until the transaction has been processed.
    return coin.sendCoin(account_one, 1.5, {from: account_two});
  }).then(function(result) {
    // Again, get the balance of account two
    return coin.balances.call(account_two)
  }).then(function(balance_of_account_two) {
    alert("Balance of account two is " + balance_of_account_two + "!") // => 1.5
  }).catch(function(err) {
    // Easily catch all errors along the whole execution.
    alert("ERROR! " + err.message);
  });*/
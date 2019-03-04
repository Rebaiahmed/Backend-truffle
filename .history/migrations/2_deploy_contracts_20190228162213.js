var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");


var User = artifacts.require('./UserContract.sol');
var Farmer = artifacts.require('./FarmerContract.sol');
var Product = artifacts.require('./Product.sol');
var Food = artifacts.require('./Food.sol');

module.exports = function(deployer) {
  /*deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Food);*/
  deployer.deploy(User);
  deployer.deploy(Farmer);
  deployer.deploy(Product);
  //deployer.link(User, MetaCoin);

};

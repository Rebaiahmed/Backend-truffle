const contract = require('truffle-contract');



const food_artifact = require('../build/contracts/Food.json');



var Food = contract(food_artifact);

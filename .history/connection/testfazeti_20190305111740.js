var services = require('./UserService.js');

var data = {
        'idUser': "5c7d43f52c4495523868c0e8",
        'description': "this is a description here" ,
        'farmerName' : "mohamed",
        'supplierName': "salah",
        'produitName': "della3"
      
}

services.addNotication (data)
.then (function(result){

    console.log('result ship ' + result);
}).catch(function(err3){
    console.log('errr'+ err3);
  })
var services = require('./UserService.js');
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId('5c7d43f52c4495523868c0e8');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/supplychai_nmeta_data";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

var data = {
        'idUser': id,
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


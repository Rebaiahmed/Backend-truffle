//const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs') ;
var qr = require('qr-image');
const User= require('./dbservice');








module.exports = {
  authenticate,
 signup
};


async function authenticate( email, password ) {

console.log('mail is' + email);

  const user = await User.findOne({ 'email':email });

  console.log('user is' + user);
  if (user) {
    
     return user ;
  }else{
    return null ;
  }
}



//___________________________________//

 async function signup(userParam) {



  return new Promise((resolve, reject) => {

// validate
/*if ( User.findOne({ email: userParam.email})) {
  throw 'Email "' + userParam.email + '" is already taken';
}*/


var code = Math.floor(1000 + Math.random() * 9000);


var user = new User({
'firstName': userParam.firstName ,
'lastName': userParam.lastName ,
'email' : userParam.email ,
'phone' : userParam.phone ,
'role' : userParam.role,
'secretcode': code
})


console.log('teh suer' + JSON.stringify(user));

//______generate confirmation code _____//

user.save(function (err, user) {
if (err) return console.error('error save' + err);


return resolve(user);


//*****GENREATE QR CODE *

});//____end user save



  })










//__________path of the Image__________//
/*var imgPath = './public_static/images/';
var qr_svg = qr.image("data ici", { type: 'png' });
var img_name = qr_svg.pipe(require('fs').createWriteStream('./public_static/images/' +code + '.png'));








fs.readFile(img_name.path, "utf8", function(err, data) {
       if (err) console.log("error");;
       user.img.data = fs.readFileSync(img_name.path).toString('utf-8');

       //console.log("data " + fs.readFileSync(''+ path+'').toString('utf-8'));
       user.img.contentType = 'image/png';



 // hash password
  if (userParam.password) {
      user.hash = bcrypt.hashSync(userParam.password, 10);
  }










});//___end fs*/


}




//_______________________________//

async function getById(id) {
  return await User.findById(id);
}

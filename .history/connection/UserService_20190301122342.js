//const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs') ;
var qr = require('qr-image');
const User= require('./dbservice');


console.log('db' + User);






module.exports = {
  authenticate,
 signup
};


async function authenticate({ username, password }) {
  const user = await User.findOne({ secretcode  });
  if (user) {
     return user ;
  }else{
    return null ;
  }
}



//___________________________________//

async function signup(userParam) {
  // validate
  if (await User.findOne({ email: userParam.email})) {
      throw 'Email "' + userParam.email + '" is already taken';
  }


var user = new User({
  'firstName': userParam.firstName ,
  'lastName': userParam.lastName ,
   'email' : userParam.email ,
   'phone' : userParam.phone ,
   'role' : userParam.role
})




//______generate confirmation code _____//

var code = Math.floor(1000 + Math.random() * 9000);
user.secretcode = code ;

//__________path of the Image__________//
var imgPath = './public_static/images/';
var qr_svg = qr.image("data ici", { type: 'png' });
var img_name = qr_svg.pipe(require('fs').createWriteStream('./public_static/images/' +userParam.code + '.png'));








fs.readFile(img_name.path, "utf8", function(err, data) {
       if (err) console.log("error");;
       user.img.data = fs.readFileSync(img_name.path).toString('utf-8');

       //console.log("data " + fs.readFileSync(''+ path+'').toString('utf-8'));
       user.img.contentType = 'image/png';

//*******************************//


 // hash password
  if (userParam.password) {
      user.hash = bcrypt.hashSync(userParam.password, 10);
  }

//***********save data */


user.save(function (err, user) {
  if (err) return console.error(err);



  //*****GENREATE QR CODE *

});//____end user save





});//___end fs


}




//_______________________________//

async function getById(id) {
  return await User.findById(id);
}

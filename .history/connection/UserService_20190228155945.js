const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./dbservice');



const User = db.User;


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

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



//___________________________________//

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
      throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
      user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}



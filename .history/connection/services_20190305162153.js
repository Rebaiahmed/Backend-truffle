// Twilio Credentials
const accountSid = 'ACc775a98a39f5e4f3cfec8a61010cfe10';
const authToken = 'd182cb5f397af450faf76196be37ca64';


// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);





exports.SendSmsVerification = function(code,phonenumber)
  {

 //__________Run our code as a Promise ( asynchronous code )
return new Promise((resolve, reject) => {




 client.messages.create(
    {
      from: '(707)368-4630',
      to: '+21620140428',
      body: "You got a new Product"
      + "Do not share this code with anyone"
    },
    (err, message) => {
      console.log('message' + message);
      if(err)
      {
        console.log('err' +err);
        return reject(err);
      }
      return resolve(message);

    }
  );//___end client*/

















    })
}

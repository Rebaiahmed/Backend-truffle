const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({


    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    confirmationcode :{ type: String, required: true },
    email :{ type: String, required: true },
    password :{ type: String, required: true },
    address :{ type: String, required: true },
    role :{ type: String, required: true },

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);

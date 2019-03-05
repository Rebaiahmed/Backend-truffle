const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({


    firstName: { type: String,  },
    idSmart: { type: String  },
    lastName: { type: String, },
    createdDate: { type: Date, default: Date.now },
     hash :{ type: String, },
    email :{ type: String,  },
    password :{ type: String,  },
    address :{ type: String,  },
    role :{ type: String,  },
    secretcode :{ type: String, },
    activitySector :{ type: String },
    companyName :{ type: String,  },
    img: { data: Buffer, contentType: String },
    notification: {
        idNotif:{type : Number},
        date: {type : new Date()},
        read :{type: Boolean},
        description: {type: String},
        farmerName : {type : String},
        supplierName: {type : String},
        produitName: {type : String}
    }

});

UserSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', UserSchema);
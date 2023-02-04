const mongoose = require('mongoose')
const DeviceSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
      },
    password:{
        type: String
      },
    phone:{
        type: Number
    },
    email:{
        type: String
        // ref: 'Event'
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    zipcode:{
        type: String
    }
})



module.exports = mongoose.model('consumer', DeviceSchema)
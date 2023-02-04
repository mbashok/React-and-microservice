const mongoose = require('mongoose')
const schema = mongoose.Schema
const DeviceSchema = mongoose.Schema({
    uid: {
        type: String
    },
    modelno: {
        type: String
      },
    manufacturingdate:{
        type: String,
    },
    consumerid:{
        type: schema.Types.ObjectId
        // ref: 'Event'
    },
    softwareversion:{
        type: String
    },
    batterystatus:{
        type: Number
    },
    batteryhealth:{
        type: Number
    },
    batterycycle:{
        type: Number
    },
    odo_reading:{
        type: Number
    },
    devicestatus:{
        type: String
    }
})

module.exports = mongoose.model('device', DeviceSchema)
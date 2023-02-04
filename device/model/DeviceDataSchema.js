const mongoose = require('mongoose')
const schema = mongoose.Schema
// const GeoSchema = new Schema({
//     type:{
//         type:String,
//         default:"Point"
//     },
//     coordinates: {}
// })
const DeviceDataSchema = mongoose.Schema({
    consumer_id: {
        type: schema.Types.ObjectId
    },
    device_id: {
        type: schema.Types.ObjectId
      },
    uid: {
        type: String
    },
    batterycycle: {
        type: String
      },
    batteryhealth:{
        type: Number,
    },
    batterystatus:{
        type: Number
    },
    batterydte:{
        type: Number
    },
    odoreading:{
        type: Number
    },
    odoreadingunit:{
        type: String
    },
    trip:{
        type: Number
    },
    // location:{
    //     type: {type:String},
    //     coordinates:[]
    // },
    datetime:{
        type: Date,
        // default: Date.now
    }
})
// DeviceDataSchema.index({location:"2dsphere"})
module.exports = mongoose.model('devicedata', DeviceDataSchema)
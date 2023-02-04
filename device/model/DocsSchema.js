const mongoose = require('mongoose')
const DocsSchema = mongoose.Schema({
    deviceid: {
        type: String
    },
    filename: {
        type: String
      },
      filetype: {
        type: String
      },
      filePath: {
        type: String
      },
    })
    
module.exports = mongoose.model('Docs', DocsSchema)
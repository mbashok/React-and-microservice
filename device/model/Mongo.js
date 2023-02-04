const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://lamba:lamba@cluster0.fo1gln5.mongodb.net/EV?retryWrites=true&w=majority").then(data => {
    console.log("connected to DB")
}).catch(error => {
    console.log(error)
})
var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const consumereapi = require('./api/consumerapi')
require("./model/Mongo")

app.use(cors())
app.use(bodyParser.json())

const port=4000;
app.use('/', consumereapi)
app.get('/',(req,res)=>{
    console.log('hey');
    res.send("<h2>hey consumer page</h2>")
})

app.listen(port,()=>{
    console.log(`server is started at port no ${port}`)
})
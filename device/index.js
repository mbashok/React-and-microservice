var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const deviceapi = require('./api/deviceapi')
const devicedata = require('./api/devicedata')
const s3 = require("./api/s3")
var moment = require('moment');
require("./model/Mongo")

app.use(cors())
app.use(bodyParser.json())

const port=4001;
app.use('/', deviceapi)
app.use('/data', devicedata)
app.use('/s3', s3)
app.get('/',(req,res)=>{
    console.log('hey');
    res.send("<h2>hey device page</h2>")
})


// var str = '2022-07-15T13:00:00.000Z';
// var date = moment(str);
// var dateComponent = date.utc().format('YYYY-MM-DD');
// var timeComponent = date.utc().format('HH:mm:ss');
// console.log(dateComponent);
// console.log(timeComponent);
app.listen(port,()=>{
    console.log(`server is started at port no ${port}`)
})
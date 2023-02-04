const express = require('express')
const router = express.Router()
const Device = require('../model/DeviceDataSchema')

router.get('/datetime/:id',async(req,res)=>{
    try {
        const devicedata = await Device.find({device_id:req.params.id}).sort({datetime:1});
        console.log(req.params.device_id)
        res.status(200).json(devicedata);
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
})
router.post("/device/:id", async (req, res) => {
  try{
    const { filterDate } = req.body
    console.log("filter",filterDate)
    const deviceday = await Device.find({ 
       device_id:req.params.id,
       datetime: {
        $gte: new Date(new Date(filterDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(filterDate).setHours(23, 59, 59))
         }
  }).sort({ datetime: 'asc'})  
    // console.log(deviceday)
    res.status(200).json(deviceday)
    } 
  catch(errorr){
    res.status(404).json({ message: "Something went wrong" });
  }
})
router.post("/day/:id", async (req, res) => {
  // try{
    
    const { filterDate } = req.body
    var date = new Date(filterDate);
    let text = date.toISOString();
    console.log("ttt",text)
    var dt = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    var df = new Date(date.getFullYear(), date.getMonth(), 1)
    // var bf =(text.getFullYear(), text.getMonth(),1)
    var bf = df.toISOString()
    console.log("filter",filterDate)
    console.log("dt",dt)
    console.log("df",df)
    console.log("bf",bf)
    const deviceday = await Device.find({ 
       device_id:req.params.id,
       datetime: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1)
         }
  }).sort({ datetime: 'asc'})  
    // console.log(deviceday)
    res.status(200).json(deviceday)
  //   } 
  // catch(errorr){
  //   res.status(404).json({ message: "Something went wrong" });
  // }
})
router.post('/createdevicedata',async(req, res)=>{
  try {
    const device = req.body;
    const newDeviceData = new Device({
      ...device
    });
      await newDeviceData.save();
      res.status(201).json(newDeviceData);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
  })



module.exports = router;
const express = require('express')
const router = express.Router()
const Device = require('../model/DeviceSchema')
const { authApi } = require('../middleware/jwtauth')
const jwt = require('jsonwebtoken')
const secret = "test";


router.get('/devices',async(req,res)=>{
    try {
        const devices = await Device.find();
        const activedevices = await Device.find({devicestatus:"active"});
        const inactivedevices = await Device.find({devicestatus:"inactive"});
        res.status(200).json({device: devices,
          activedevice: activedevices,
          inactivedevice: inactivedevices});
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
})
router.get('/total',async(req,res)=>{
      const countdata=[];
      const devicesdata = await Device.find().count();
      const activedevicesdata = await Device.find({devicestatus:"active"}).count();
      const inactivedevicesdata = await Device.find({devicestatus:"inactive"}).count();
      countdata.push({
          device: devicesdata,
          activedevice: activedevicesdata,
          inactivedevices: inactivedevicesdata
      })
      res.status(200).json({device: devicesdata,
        activedevice: activedevicesdata,
        inactivedevices: inactivedevicesdata})
})
// router.get('/activedevice',async(req,res)=>{
//   // const countdata=[];
//   const activedevicesdata = await Device.find({devicestatus:"active"});
//   res.status(200).json(activedevicesdata);

// })
// router.get('/inactivedevice',async(req,res)=>{

//   const inactivedevicesdata = await Device.find({devicestatus:"inactive"});
//   res.status(200).json(inactivedevicesdata);

// })
router.post('/createdevice',async(req, res)=>{
    const device = req.body;
    const newDevice = new Device({
      ...device,
      consumerid: req.userId,
    });
    
    try {
      await newDevice.save();
      res.status(201).json(newDevice);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
    })

    // router.get('/consumerdevice/:id', async(req, res)=>{
    //   const { id } = req.params;
    //   if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ message: "User doesn't exist" });
    //   }
    //   try{
    //   const consumerdevice = await Device.find({ consumerid: id });
    //   res.status(200).json(consumerdevice);
    //   }catch(error){
    //     res.status(404).json({ message: "Something went wrong" });
    //   }
    //     });
    router.patch('/updatebatterystatus', authApi, async(req, res) => {
      console.log(req.id)
      try {
        const devicedata=req.body;
        const newDevice = await  Device.findByIdAndUpdate(req.id,devicedata)
        res.status(201).json(newDevice);
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
    });
    router.post("/auth", async (req, res) => {
      const { uid } = req.body

      const Uid = await Device.findOne({ uid })
      console.log(Uid)
      if (Uid) {
        const token1 = jwt.sign({ uid: Uid.uid ,id: Uid._id}, secret, {
          expiresIn: "30d",
        });
        console.log(token1)
        res.json({
       token: token1
        })
        } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    })

router.get('/device/:id', async(req, res)=>{
      
  try {
    const newDevice = await Device.findById(req.params.id)
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.patch('/updatedevice/:id', async(req, res) => {
  try {
    const devicedata=req.body;
    const newDevice = await  Device.findByIdAndUpdate(req.params.id,devicedata)
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.delete('/deletedevice/:id', async(req, res)=>{
  try {
    const id=req.params.id;
    await Device.findByIdAndDelete(id)
    res.status(201).json({message: "Deleted Successfully"});
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
})
module.exports = router;
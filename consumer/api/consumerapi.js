const express = require('express')
const router = express.Router()
const Consumer = require('../model/ConsumerSchema')
const jwt = require('jsonwebtoken')
const secret = "test";

router.get('/consumers',async(req,res)=>{
    try {
        const consumers = await Consumer.find();
        res.status(200).json(consumers);
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
})

router.post('/createconsumer',async(req, res)=>{
    try {
      const { firstname, lastname, password, phone, email, city, state, zipcode } = req.body

  // Check if user exists
  const userExists = await Consumer.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Create user
  const newConsumer = await Consumer.create({
    firstname,
    lastname,
    password,
    phone,
    email,
    city,
    state,
    zipcode
  })

  if (newConsumer) {
      await newConsumer.save();
      res.status(201).json(newConsumer);
    } else {
      res.status(400).json({message: "Invalid User Data"})
    }}
    catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
    })
router.post("/login", async (req, res) => {
      const { email, password } = req.body
    
      // Check for user email
      try{
      const consumer = await Consumer.findOne({ email })
      console.log(consumer)
      if (consumer && (password === consumer.password)) {
        // const token1 = jwt.sign({ email: consumer.email, id: consumer._id }, secret, {
        //   expiresIn: "30d",
        // });
        // console.log(token1)
        res.json({
          _id: consumer.id,
          firstname: consumer.firstname,
          lastname: consumer.lastname,
          email: consumer.email,
          // token: token1,
        })
        } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }}
      catch(errorr){
        res.status(404).json({ message: "Something went wrong" });
      }
    })


router.get('/consumer/:id', async(req, res)=>{
      
  try {
    const newConsumer = await Consumer.findById(req.params.id)
    res.status(201).json(newConsumer);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.patch('/updateconsumer/:id', async(req, res) => {
  try {
    const consumerdata=req.body;
    const newConsumer = await  Consumer.findByIdAndUpdate(req.params.id,consumerdata)
    res.status(201).json(newConsumer);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.delete('/deleteconsumer/:id', async(req, res)=>{
  try {
    const id=req.params.id;
    await Consumer.findByIdAndDelete(id)
    res.status(201).json({message: "Deleted Successfully"});
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
})
module.exports = router;
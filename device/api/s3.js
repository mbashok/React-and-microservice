const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk');
const fs = require('fs');
const multer= require("multer")
const path = require('path')
const multerS3= require("multer-s3-v2")
const { authApi } = require('../middleware/jwtauth')
const Docs = require('../model/DocsSchema');
require("dotenv").config()

AWS.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
});
const BUCKET = process.env.BUCKET
const s3 = new AWS.S3();
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'ev-cluster-demo',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null,file.originalname);
        }
    })
});


router.post('/upload', upload.single('file'), authApi ,(req, res) => {
    const uploadedFile = req.file.location;
    const Filename = req.file.originalname;
    const extension = path.extname(req.file.originalname);
    const newDoc = new Docs({
        filePath: uploadedFile ,
        deviceid: req.uid,
        filename: Filename,
        filetype: extension
      });
      newDoc.save()
        .then(result => {
            return res.json({ status: 'OK', ...result });
        })
});
router.get('/download/:filename',authApi, async(req, res) => {
     Docs.findOne({deviceid:req.uid , filename:req.params.filename}).then(result => {
            paths =result.filename
            console.log(paths)
            var fileStream = s3.getObject({ Bucket: BUCKET, Key: paths  }).createReadStream();
            console.log(fileStream)
            fileStream.pipe(res);
        });
});


// router.get("/download", async (req, res) => { 
//     try{
//         var params = {
//             Bucket: BUCKET
//         }
//         s3.listObjects(params, async(err, data)=>{
//             if (err) return console.log(err);
//             var contents = data.Contents;
//             contents.forEach(async (content)=> {
//             //   allKeys.push(content.Key);
//                     var key = content.Key;
//                     // console.log('Downloading: ' + key);
//                     // console.log(allKeys)
//                     var fileParams = {
//                         Bucket: BUCKET,
//                         Key: key
//                     }
//                     console.log(key)
//                     let file= fs.createWriteStream('\Device\download\index.html')
//                     return new Promise((resolve,reject)=>{
//                         s3.getObject(fileParams).createReadStream()
//                         .on('end',()=>{
//                                 return resolve()
//                         })
//                         .on('error',(error)=>{
//                             return reject((error))
//                         }).pipe(file)
//                     })
//                     // res.attachment(key);
//                     // var fileStreams =await s3.getObject(fileParams).promise()
//                     // res.send(fileStreams)
//                     // fileStreams.pipe(res);
//                 })
//         })
//     }catch{
//         res.send([])
//    }
// })

module.exports = router;
const jwt = require('jsonwebtoken')
const secret = "test";

// const authMiddleware = async(req, res, next)=>{  
//     let token
//     const authHeader = req.headers.authorization || req.headers.Authorization
//     if(authHeader){
//    try{
//     console.log(authHeader)
//      token = authHeader.split(' ')[1];
//     console.log(token)
//         let decoded = jwt.verify(token,secret)
//         req.userId = decoded?.id;
//         req.useremail= decoded?.email;
//         console.log(req.userId);
//         console.log(req.useremail);
//         next();
//    }catch (error) {
//             res.status(404).json({ message: "Not authorized'" });
//           }
//         }
//           if (!token) {
//             res.status(401).json({ message: "No token" });
//           }
// }
const authApi = async(req, res, next)=>{  
  let token
  const authHeader = req.headers.authorization || req.headers.Authorization
  if(authHeader){
 try{
  // console.log(authHeader)
   token = authHeader.split(' ')[1];
  // console.log(token)
      let decoded = jwt.verify(token,secret)
      req.uid= decoded.uid;
      req.id= decoded.id;
      // console.log(req.uid);
      // console.log(req.id);
      next();
 }catch (error) {
          res.status(404).json({ message: "Not authorized'" });
        }
      }
        if (!token) {
          res.status(401).json({ message: "No token" });
        }
}

module.exports = { authApi}
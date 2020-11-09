/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")

module.exports ={
  restrict
} 
function restrict(){
return async (req, res, next) => {
try{
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({ message: 'shall not pass!' });
  }

  jwt.verify(token,process.env.JWT_SECRET, (err, decoded)=>{
    if(err){
      return res.status(401).json({
      message:"Invalid credentials",
          })	
      }
      req.token = decoded

      next()
  })
}catch(err){
            next(err)
        }
};
}
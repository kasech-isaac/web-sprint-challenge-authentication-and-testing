const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const db = require("./auth-model")


const {restrict} = require("./authenticate-middleware")


router.post('/register', async (req, res) => {
  // implement registration
  try{
    const {username, password} = req.body
    const users = await db.findByUser(username)
    if (users) {
        return res.status(409).json({
            message: "Username is already taken",
        })
    }
    const newUser =await db.add({
        username,
        password: await bcrypt.hash(password, 13),
      
    })
      res.status(200).json(newUser)
     }catch(err){
       console.log(err)
        }
});

router.post('/login', async (req, res) => {
  // implement login
  try{
    const { username, password} = req.body
    const theUser = await db.findByUser({ username })

    if (!theUser) {
      return res.status(400).json({
        message: "You shall not pass!",
      });
    }
    const passwordCheck = await bcrypt.compare(password, theUser.password);

        if (!passwordCheck) {
      return res.status(400).json({
        message: "You shall not pass!",
      });
    }
    
    const token=jwt.sign({
  userId: user.id,
  user:user.username,
    },process.env.JWT_SECRET)
    
    res.cookie("token", token) 

    res.status(200).json({ message: `Welcome ${theUser.username}` })
  }catch(err){
    next(err)
    }
});

module.exports = router;

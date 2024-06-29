const user_model = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.getUser = async (req,res)=>{

    const email = req.body.email;

  try {
    const user = await user_model.findOne({ email });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    
}

exports.login = async (req,res)=>{
    //find user by email id
    const user = await user_model.findOne({email : req.body.email})

    if(!user){
        return res.status(400).send({
            message : "user not found!"
        })
    }

    //check password 
    const isPasswordValid = bcryptjs.compareSync(req.body.password,user.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message : "password is not correct"
        })
    }

    //asisgn token
    const token = jwt.sign({id : user._id},'secret message',{expiresIn : '1d'})

    res.status(200).send({
        name : user.name,
        email : user.email,
        userType : user.userType,  
        id : user._id,
        accessToken : token
    })


}
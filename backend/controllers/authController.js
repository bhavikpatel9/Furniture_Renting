const user_model = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signUp = async (req,res)=>{

    const user_obj = {
        name : req.body.name,
        // userId : req.body.userId,
        password : bcryptjs.hashSync(req.body.password,8),
        email : req.body.email,
        userType : req.body.userType
    }

    console.log(user_obj);

    try {
        const user_created = await user_model.create(user_obj)

        res.status(201).send(user_created)
    } catch (error) {
        console.log("error while registering user "+ error);
        res.status(500).send({
            message : "some error occured while registering user"
        })
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
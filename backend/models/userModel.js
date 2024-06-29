const mongoose = require("mongoose")

// name
// password
// email
// userType

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    userType : {
        type : String,
        default : "CUSTOMER",
        enum : ["CUSTOMER","ADMIN"]
    },
})

module.exports = mongoose.model("users",userSchema)
const user_controller = require("../controllers/getUserController")

module.exports = (app)=>{

    app.post("/furniture/api/v1/auth/getuser",user_controller.getUser)
    app.put("/furniture/api/v1/auth/update",user_controller.updateUserProfile)
}
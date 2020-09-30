express=require('express')
const authRouter=express.Router();
let { login, register}=require("../controller/authController")
authRouter.route("/login").post(login);
authRouter.route("/register").post(register);
module.exports=authRouter

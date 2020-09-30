const secrets = require("../configs/secrets")
const userModel=require("../model/userModel")
const jwt=require('jsonwebtoken')
async function register(req,res){
try{
    var sdata=new userModel(req.body)
    sdata.save()
res.status(200).json({
    status:"user registered!",

})
}catch(err){
res.status(400).json({
    status:"something went wrong",
    message:err.message
})
}
}

async function login(req,res){
try{
   
   // console.log(req.body )
   
    const {name,password}=req.body;
    

    let user = await userModel.findOne({ name }).select("+password");
    //console.log(user)
    if(user){
       
        if(password==user.password){
            const {_id}=user
            const token = jwt.sign({ id: _id }, secrets.JWT_SECRET, { expiresIn: Date.now() + 1000 * 60 * 30 })
            res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
            status:"success!",
            user:user,
            token
        })
    }else{
        res.status(201).json({
            status:"failure!",
            message:"User name & Password didnt match!!"
        })
    }
    }else{
        res.status(201).json({
            status: "failure!",
            message: "User doesnt exist.Check again!"
        })
    }
}catch(err){
    res.status(201).json({
        status: "something went wrong",
        message: err.message
    })
}
}


module.exports.register=register;
module.exports.login=login;

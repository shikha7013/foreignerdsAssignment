const mongoose=require('mongoose')
const secrets = require("../configs/secrets")
mongoose.connect(secrets.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (conn) {
    console.log("Connection to testDB established");
    // console.log(conn)
}).catch(function (err) {
    console.log(err);
})

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
       
    }, password: {
        type: String,
        required: [true, "password is required"],
        select: false
    }, confirmPassword: {
        type: String,
        required: [true, "confirmPassword is required"],
        validate: {
            validator: function () {
                return this.password == this.confirmPassword
            },
            message: "Password and confirm password should be same"
        }
    }
})

const userModel = mongoose.model("TestModel", testSchema);
module.exports = userModel;
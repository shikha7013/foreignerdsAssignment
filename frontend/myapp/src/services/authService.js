import axios from 'axios';
class AuthService{
    login(username,password){
        console.log(username+ " "+password+"hi")
        return axios.post("/api/login",{
            username,password
        }).then((response)=>{
            console.log("got data")
            return response.data;
        }).catch(function(err){
           console.log(err)
        })
    }
}
export default new AuthService();
import Axios from 'axios';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
class Register extends Component {
    state = {  
        name:"",
        password:"",
        cnfpassword:"",
        registered:false,
        login:false
    }
    handlenameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handlepassChange = (e) => {
        this.setState({ password: e.target.value })
    }
    handlecnfpassChange=(e)=>{
        this.setState({ cnfpassword: e.target.value })
    }
    handleSubmit=(e)=>{
      
        e.preventDefault();
        const userObject = {
            name: this.state.name,
            password: this.state.password,
            confirmPassword:this.state.cnfpassword
        };
        if(this.state.password!=this.state.cnfpassword){
            alert('Password did not match.Please try again!!')
            this.setState({
                name:"",
                password:"",
                cnfpassword:""
            })
        }else{
        Axios.post('/api/register',userObject).then((response)=>{
            
            if (response.data.status =='user registered!'){
              this.setState({registered:true})
              alert(`User registered!`)
            }
        
    
        }).catch((error)=>{
            console.log(error)
        })
    }
    }
    handleLogin=()=>{
        this.setState({login:true})
    }
    render() { 
        if(this.state.registered||this.state.login){
            return(
                <Redirect to="/login"></Redirect>
            )
        }
        return ( 
            <React.Fragment>
                <h1>Registration form</h1>
                <div className="form-container">
                    <input type="text" value={this.state.name} onChange={this.handlenameChange} placeholder="name"></input>
                    <br></br>
                    <input type="password" value={this.state.password} onChange={this.handlepassChange} placeholder="password"></input>

                    <br></br>
                    <input type="password" value={this.state.cnfpassword} onChange={this.handlecnfpassChange} placeholder="password"></input>
                    <br></br>
                    <button type="submit" onClick={this.handleSubmit}>Register</button>
                    <button type="submit" onClick={this.handleLogin}>Go to Login </button>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Register;
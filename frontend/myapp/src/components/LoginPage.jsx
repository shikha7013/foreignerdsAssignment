import axios from 'axios';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Login extends Component {
        state = {
            name: "",
            password: "",
            login:false,
            token:"",
            register:false
        }
    handlenameChange=(e)=>{
this.setState({name:e.target.value})
    }
    handlepassChange=(e)=>{
        this.setState({password:e.target.value})
    }
    handleSubmit=(e)=>{
       // alert('Hi')
    e.preventDefault();
        const userObject = {
            name: this.state.name,
            password: this.state.password
        };
        // console.log(userObject)
        axios.post('api/login', userObject).then((response)=>{
            if(response.data.status=='success!'){
        let name=response.data.user.name
        let token=response.data.token
        
        if(name){
           localStorage.setItem('login',JSON.stringify({
               login:true,
               token:token
           }))
        }
        this.setState({login:true})
    }else if(response.data.status=='failure!'){
        alert(`${response.data.message}`)
    }
    }).catch(error=>{
        console.log(error)
    })
    }
    componentDidMount(){
        this.storageCollector();
    }
    storageCollector=()=>{
        let token=JSON.parse(localStorage.getItem('login'))
        if(token){
            this.setState({login:true,token:token})
        }
    }
    handleLogout=()=>{
       
            localStorage.clear()
            this.setState({login:false,name:"",password:""})
    }
    handleRegister=()=>{
        this.setState({register:true})
    }
    render() { 
        if(this.state.register){
            return (
                <Redirect to="/register"></Redirect>
            )
        }
        return ( 
            !this.state.login?
            <React.Fragment>
                <h1>Login Form</h1>
                <div className="form-container">
                    <input type="text" value={this.state.name} onChange={this.handlenameChange} placeholder="name"></input>
                        <br></br>
                        <input type="password" value={this.state.password} onChange={this.handlepassChange} placeholder="password"></input>
                   
                    <br></br>
                        <button type="submit" onClick={this.handleRegister}>Register</button>
                    <button type="submit" onClick={this.handleSubmit}>Login</button>
                    <br>
                    </br>
                       
                        <br></br>
                </div>
            </React.Fragment>
            :
            <React.Fragment>
                <div className="form-container">
                    Welcome,you are loggedin!
                    <br></br>
                    <button type="submit" onClick={this.handleLogout}>Logout</button>
                </div>
            </React.Fragment>
            
         );
    }
}
 
export default Login;
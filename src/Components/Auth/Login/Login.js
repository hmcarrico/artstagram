import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: null,
            password: null,
            message: null
        }
    }

    handleInputs = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter"){
            this.loginUserIn();
        }
    }

    loginUserIn = () => {
        const { email, password } = this.state;
        if(email && password){
            axios.post('auth/login', {email, password}).then(res => {
                if(res.data.message){
                    this.setState({
                        message: res.data.message
                    })
                } else {
                    this.props.history.push('/feed')
                }
            })
        } else {
            this.setState({
                message: "Please make sure all inputs are filled in"
            })
        }
    }

    render(){
        const { message } = this.state;
        const { changeStep } = this.props;
        return <div className='login'>
            <div>
                <h3>Email</h3>
                <input
                    name='email'
                    onChange={(e) => this.handleInputs(e)}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
            <div>
                <h3>Password</h3>
                <input
                    name='password'
                    type="password"
                    onChange={(e) => this.handleInputs(e)}
                    onKeyPress={(e) => this.handleKeyPress(e)}
                />
            </div>
            <div>
                <button onClick={() => this.loginUserIn()}>Login</button>
            </div>
            <div>
                <p style={{color: "red"}}>{message}</p>
            </div>
            <div>
                <p onClick={() => changeStep(3)}>Don't have an account? <b>Sign up</b></p>
            </div>
        </div>
    }
}

export default withRouter(Login);
import React, { Component } from 'react';
import axios from 'axios';
import StepOne from '../Step1/RegisterStepOne';
import StepTwo from '../Step2/RegisterStepTwo';

class RegisterWizard extends Component{
    constructor(){
        super();
        this.state = {
            registerStep: 1,
            email: null,
            password: null,
            confirmPassword: null,
            firstName: null,
            lastName: null,
            username: null,
            bio: null,
            message: null,
            isAvailable: ''
        }
    }

    handleInputs = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    changeRegisterStep = (newStep) => {
        const { email, password, confirmPassword } = this.state;
        if(email && password && confirmPassword){
            if(password === confirmPassword){
                this.setState({
                    registerStep: newStep
                })
            } else {
                this.setState({
                    message: "passwords do not match"
                })
            }
        } else {
            this.setState({
                message: "please fill in all inputs"
            })
        }
    }

    checkAvailableUsernames = (e) => {
        const { value } = e.target;
        axios.get(`/auth/verifyUsername/${value}`).then(res => {
            this.setState({
                username: value,
                isAvailable: res.data.message
            })
        })
    }

    handleKeyPress = (e, step) => {
        if (e.key === "Enter"){
            if(step === 1){
                this.changeRegisterStep(2)
            } else {
                this.registerUser();
            }
        }
    }

    registerUser = () => {
        const {
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
            username,
            bio
        } = this.state
        const userInfo = {
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
            username
        }
        if(!bio){
            userInfo.bio = ""
        } else {
            userInfo.bio = bio
        }
        if(password && confirmPassword && email && firstName && lastName && username && bio){
            axios.post('/auth/signup', userInfo).then(res => {
                if(res.data.message){
                    this.setState({
                        message: res.data.message
                    })
                } else {
                    console.log(res.data)
                    alert("I think it worked!")
                }
            })
        }
    }

    render(){
        console.log('register state -->',this.state)
        const { changeStep } = this.props;
        const { registerStep, isAvailable, message } = this.state;
        let displayRegisterPage;
        if(registerStep === 1){
            displayRegisterPage = <div>
                <StepOne
                    message={message}
                    registerStep={this.changeRegisterStep}
                    handleInputs={this.handleInputs}
                    handleKeyPress={this.handleKeyPress}
                />
            </div>
        } else if (registerStep === 2){
            displayRegisterPage = <div>
                <StepTwo
                    message={message}
                    registerStep={this.changeRegisterStep}
                    handleInputs={this.handleInputs}
                    handleKeyPress={this.handleKeyPress}
                    checkAvailableUsernames={this.checkAvailableUsernames}
                    registerUser={this.registerUser}
                    isAvailable={isAvailable}
                />
            </div>
        }
        return <div>
            {displayRegisterPage}
            <div>
                <p style={{textAlign: "center"}} onClick={() => changeStep(2)}>Already have an account? <b>Sign in</b></p>
            </div>
        </div>
    }
}

export default RegisterWizard;
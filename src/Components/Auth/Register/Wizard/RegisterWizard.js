import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import StepOne from '../Step1/RegisterStepOne';
import StepTwo from '../Step2/RegisterStepTwo';
import '../Register.scss'

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
            isAvailable: '',
            emailAvailable: "",
            emailCheck: false
        }
    }

    handleInputs = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    changeRegisterStep = (newStep) => {
        const { email, password, confirmPassword, emailCheck } = this.state;
        const emailCheck1 = email.split("").includes("@");
        const emailCheck2 = email.split("").includes(".");
        if(email && password && confirmPassword){
            if(password === confirmPassword){
                    if(emailCheck1 && emailCheck2){
                        if(emailCheck){
                            this.setState({
                                registerStep: newStep
                            })
                        } else {
                            this.setState({
                                message: "Email is taken"
                            })
                        }
                    } else {
                    this.setState({
                        message: "email invalid"
                    })
                }
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

    checkAvailableEmail = (e) => {
        const { value } = e.target;
        if(value.length > 0){
            axios.get(`/auth/verifyEmail/${value}`).then(res => {
                if(res.data.message === "available"){
                    this.setState({
                        email: value,
                        emailAvailable: "Email is available",
                        emailCheck: true
                    })
                } else {
                    this.setState({
                        email: value,
                        emailAvailable: "Email is taken",
                        emailCheck: false
                    })
                }
            })
        }
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
                    this.props.history.push(`/account/${username}`)
                }
            })
        }
    }

    render(){
        const { changeStep } = this.props;
        const { registerStep, isAvailable, message, emailAvailable } = this.state;
        let displayRegisterPage;
        if(registerStep === 1){
            displayRegisterPage = <div>
                <StepOne
                    message={message}
                    emailAvailable={emailAvailable}
                    registerStep={this.changeRegisterStep}
                    handleInputs={this.handleInputs}
                    handleKeyPress={this.handleKeyPress}
                    checkAvailableEmail={this.checkAvailableEmail}
                    changeStep={changeStep}
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
                    changeStep={changeStep}
                />
            </div>
        }
        return <div>
            {displayRegisterPage}
        </div>
    }
}

export default withRouter(RegisterWizard);
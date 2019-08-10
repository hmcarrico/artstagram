import React, { Component } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';
import RegisterWizard from '../Register/Wizard/RegisterWizard';
import './AuthWizard.scss';

class AuthWizard extends Component{
    constructor(){
        super();
        this.state = {
            step: 1
        }
    }

    changeStep = (stepNumber) => {
        this.setState({
            step: stepNumber
        })
    }

    render(){
        const { step } = this.state;
        let display;
        if(step === 1){
            display = <div>
                <LandingPage
                    changeStep={this.changeStep}
                />
            </div>
        } else if (step === 2){
            display = <div>
                <Login
                    changeStep={this.changeStep}
                />
            </div>
        } else if (step === 3){
            display = <div>
                <RegisterWizard
                    changeStep={this.changeStep}
                />
            </div>
        }
        return (
            <div >
                <div className="auth-container">
                    {display}
                </div>
            </div>
        )
    }
}

export default AuthWizard;
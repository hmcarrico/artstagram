import React from 'react';
import '../Register.scss';

function RegisterStepOne(props){
    const { registerStep, handleInputs, handleKeyPress, message, checkAvailableEmail, emailAvailable, changeStep } = props;
    return (
        <div className='register'>
            
            <div>
                <h3>Email</h3>
                <p style={emailAvailable ? {color: "green"} : {color: "red"}}>{emailAvailable}</p>
                <input
                    name='email'
                    onChange={(e) => handleInputs(e)}
                    onKeyPress={(e) => checkAvailableEmail(e, 1)}
                />
            </div>
            <div>
                <h3>Password</h3>
                <input
                    name='password'
                    type="password"
                    onChange={(e) => handleInputs(e, 1)}
                    onKeyPress={(e) => handleKeyPress(e, 1)}
                />
            </div>
            <div>
                <h3>Confirm Password</h3>
                <input
                    name='confirmPassword'
                    type="password"
                    onChange={(e) => handleInputs(e)}
                    onKeyPress={(e) => handleKeyPress(e, 1)}

                />
            </div>
            <div>
                <p style={{color: "red"}}>{message}</p>
            </div>
            <button onClick={() => registerStep(2)}>Next</button>
            <div>
                <p style={{textAlign: "center"}} onClick={() => changeStep(2)}>Already have an account? <b>Sign in</b></p>
            </div>
        </div>
    )
}

export default RegisterStepOne;
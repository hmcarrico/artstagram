import React from 'react';
import '../Register.scss';

function RegisterStepOne(props){
    const { registerStep, handleInputs, handleKeyPress, message } = props;
    return (
        <div className='register'>
            
            <div>
                <h3>Email</h3>
                <input
                    name='email'
                    onChange={(e) => handleInputs(e)}
                    onKeyPress={(e) => handleKeyPress(e, 1)}
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
        </div>
    )
}

export default RegisterStepOne;
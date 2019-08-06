import React from 'react';
import '../Register.scss';

function RegisterStepTwo(props){
    const { handleInputs, isAvailable, checkAvailableUsernames, registerUser } = props;
    const splitCheck = isAvailable.split(" ");
    return (
        <div className='register'>
            <div>
                <h3>First Name:</h3>
                <input
                    name='firstName'
                    onChange={(e) => handleInputs(e)}
                />
            </div>
            <div>
                <h3>Last Name</h3>
                <input
                    name='lastName'
                    onChange={(e) => handleInputs(e)}
                />
            </div>
            <div>
                <h3>Username</h3>
                <p style={splitCheck.includes("taken") ? {color: "red"}: {color: "green"}}>{isAvailable}</p>
                <input
                    name='username'
                    onChange={(e) => checkAvailableUsernames(e)}
                />
            </div>
            <div>
                <h3>Bio(max 300 characters)</h3>
                <p>(optional)</p>
                <textarea
                    name='bio'
                    onChange={(e) => handleInputs(e)}
                />
            </div>
            <button onClick={() => registerUser()}>Sign Up!</button>
        </div>
    )
}

export default RegisterStepTwo;
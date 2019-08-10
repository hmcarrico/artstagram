import React from 'react';
import './LandingPage.scss';

function LandingPage(props){
    const { changeStep } = props;
    return (
            <div>
                <div>
                    <img
                        src="https://i.gifer.com/78R0.gif"
                        className="landing-background"
                        />
                </div>
                <div className="landing-content-container">
                    <div className="typewriter">
                        <h2>Welcome</h2>
                            <h2>to</h2>
                        <h1>Artsagram</h1>
                    </div>
                    <div>
                        <button onClick={() => changeStep(2)}>Login</button>
                    </div>
                    <div>
                        <button onClick={() => changeStep(3)}>Sign Up</button>
                    </div>
                </div>
            </div>
    )
}

export default LandingPage;
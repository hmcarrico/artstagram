import React from 'react';
// import PaintVideo from '../../Assets/paint_background.mp4';
// import Colors from '../../Assets/colors.mp4';
// import Ink from '../../Assets/ink.mp4';
// import Stars from '../../Assets/stars.mp4';
// import ColorInk from '../../Assets/color_ink.mp4';
import './LandingPage.scss';

function LandingPage(props){
    const { changeStep } = props;
    return (
        <div className="video-container">
            {/* <div>
                <video autoPlay muted loop height="280px" width="380px" className="video">
                    <source src={PaintVideo} type="video/mp4" />>
                </video>
            </div> */}
            <div>
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
    )
}

export default LandingPage;
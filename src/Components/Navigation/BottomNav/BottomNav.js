import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BottomNav.scss';

function BottomNav(props){
    const { username } = props.user
    return (
        <div className='bottom-nav-container'>
            <Link to='/feed'>
                <img
                    src="https://img.icons8.com/ios-glyphs/50/000000/activity-feed.png"
                    alt="feed"
                />
            </Link>
            <Link to='/explore'>
                <img
                    src="https://img.icons8.com/ios-filled/50/000000/compass.png"
                    alt="explore"
                />
            </Link>
            <Link to='/newpost'>
                <img
                    src="https://img.icons8.com/material/64/000000/add-to-clipboard.png"
                    alt="new post"
                />
            </Link>
            <Link to={`/account/${username}`} >
                <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                    alt="account"
                />
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(BottomNav);
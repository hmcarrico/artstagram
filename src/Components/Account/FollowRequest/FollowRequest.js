import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FollowRequest.scss'

class FollowRequest extends Component{
    constructor(){
        super();
        this.state = {
            followRequest: []
        }
    }

    componentDidMount(){
        axios.get(`/follows/getfollowrequest/${this.props.user.user_id}`).then(res => {
            console.log("FOLLOW REQUEST DATA", res)
            this.setState({
                followRequest: res.data
            })
        })
    }

    render(){
        const { followRequest } = this.state;
        const followers = followRequest.map(request => {
            return (
                <Link to={`/account/${request.username}`} >
                    <div className='detailed-request'>
                        <div className="detailed-request-container">
                            <img
                                src={request.profile_picture}
                                className='request-profile-pic'
                            />
                            <div className="sub-details-request">
                                <div>
                                    <b>{request.username}</b>
                                </div>
                                <div className='request-name'>
                                    <p>{request.first_name} {request.last_name}</p>
                                </div>
                            </div>
                        </div>
                        <button>Accept</button>
                    </div>
                </Link>
            )
        })
        return (
            <div className="request-outside-container">
                <h1>Request</h1>
                {followers}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(FollowRequest);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Follows.scss';

class Follows extends Component{
    constructor(){
        super();
        this.state = {
            follows: []
        }
    }

    componentDidMount(){
        const { ersOrIng, userId } = this.props.match.params;
        console.log(userId)
        if(ersOrIng === 'ers'){
            axios.get(`/follows/followerWhoFollowMe/${userId}`).then(res => {
                console.log(res.data)
                this.setState({
                    follows: res.data
                })
            })
        } else if(ersOrIng === "ing"){
            axios.get(`/follows/whoIAmFollowing/${userId}`).then(res => {
                this.setState({
                    follows: res.data
                })
            })
        }
    }

    render(){
        const { ersOrIng } = this.props.match.params;
        const { follows } = this.state;
        const followingDisplay = follows.map(person => {
            return (
                <Link to={`/account/${person.username}`} >
                    <div className='detailed-follows'>
                        <div className="detailed-follow-container">
                            <img
                                src={person.profile_picture}
                                className='follow-profile-pic'
                            />
                            <div className="sub-details-followers">
                                <div>
                                    <b>{person.username}</b>
                                </div>
                                <div className='follow-name'>
                                    <p>{person.first_name} {person.last_name}</p>
                                </div>
                            </div>
                        </div>
                        <button>Following &#10003;</button>
                    </div>
                </Link>
            )
        })
        return (
            <div className='follow-container'>
                {
                    ersOrIng === 'ers' ?
                    <div>
                        <h1>Followers</h1>
                        {followingDisplay}
                    </div>
                    :
                    <div>
                        <h1>Following</h1>
                        {followingDisplay}
                    </div>
                }
            </div>
        )
    }
}

export default Follows;
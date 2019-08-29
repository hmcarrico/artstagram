import React, { Component } from 'react';
import UserPosts from '../UserPosts/UserPosts';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Profile.scss';

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            posts: [],
            loading: true,
            user_id: null,
            followers: 0,
            following: 0,
        }
    }
    async componentDidMount(){
        let userData = await axios.get(`/users/${this.props.match.params.username}`).then(res => res.data[0])
        let postData = await axios.get(`/posts/user/${this.props.match.params.username}`).then(res => res.data)
        let followerData = await axios.get(`/follows/followerWhoFollowMe/${userData.user_id}`).then(res => res.data)
        let followingData = await axios.get(`/follows/whoIAmFollowing/${userData.user_id}`).then(res => res.data)
        if(userData){
            this.setState({
                user: userData,
                posts: postData,
                followers: followerData,
                following: followingData,
                loading: false,
                user_id: userData.user_id
            })
        }
    }

    render(){
        const { user, posts, user_id, followers, following } = this.state;
        const { username } = this.props.match.params;
        const currentUser = this.props.user.username;
            const doYouFollow = user.username ?
                followers.filter(person => {
                console.log(person)
                return person.username === currentUser
            }): false
        const displayUserPosts = posts.map(post => {
            return <div>
                <UserPosts post={post}/>
            </div>
        })
        return (
            <div>
                <div className="profile-container">
                    <div>
                        {
                            <h3>{user.username}</h3>
                        }
                    </div>
                    <div className='follows-container'>
                        <div className='followers-picture'>
                            <div>
                                {
                                    this.state.loading ?
                                    <img src="https://ui-ex.com/images/background-transparent-loading-3.gif" />
                                    :
                                    <img src={user.profile_picture} alt="profile"/>
                                }
                            </div>
                            <div className="follows">
                                <b>Posts</b>
                                <p>{posts.length}</p>
                            </div>
                            <div className="follows">
                                <Link
                                    to={`/followers/${username}/${user_id}`}
                                    className="link"
                                >
                                    <b>Followers</b>
                                    <p>{followers.length}</p>
                                </Link>
                            </div>
                            <div className="follows">
                                <Link
                                    to={`/following/${username}/${user_id}`}
                                    className="link"
                                >
                                <b>Following</b>
                                <p>{following.length}</p>
                            </Link>
                            </div>
                            </div>
                            {
                                followers && username !== currentUser ?
                                <div className='follow-button'>
                                    {
                                        doYouFollow.length
                                        ?
                                        <button>Following &#10003;</button>
                                        :
                                        <button /*onClick={}*/>Follow</button>

                                    }
                                </div>
                                :
                                <div className='follow-button'>
                                    {
                                        this.state.loading ?
                                        <></>
                                        :
                                        <button>Edit Profile</button>
                                    }
                                </div>
                            }
                    </div>
                </div>
                <hr />
                <div className='name-bio'>
                    <div>
                        <b>{user.first_name} {user.last_name}</b>
                    </div>
                    <div>
                        <p>{user.bio}</p>
                    </div>
                </div>
                <hr />
                    <div className='post'>
                        <b>POSTS</b>
                    </div>
                    <div className='post-display'>
                        {displayUserPosts}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(Profile);
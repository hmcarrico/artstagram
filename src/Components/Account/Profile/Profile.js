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
            user_id: null
        }
    }
    async componentDidMount(){
        let userData = await axios.get(`/users/${this.props.match.params.username}`).then(res => res.data[0])
        let postData = await axios.get(`/posts/user/${this.props.match.params.username}`).then(res => res.data)
        console.log(userData)
        if(userData){
            this.setState({
                user: userData,
                posts: postData,
                loading: false,
                user_id: userData.user_id
            })
        }
    }

    render(){
        const { user, posts, user_id } = this.state;
        const { username } = this.props.match.params;
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
                            <Link to={`/followers/${username}/${user_id}`}>
                                <b>Followers</b>
                                <p>200</p>
                            </Link>
                        </div>
                        <div className="follows">
                        <Link to={`/following/${username}/${user_id}`}>
                            <b>Following</b>
                            <p>130</p>
                        </Link>
                        </div>
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
import React, { Component } from 'react';
import UserPosts from '../UserPosts/UserPosts';
import axios from 'axios';
import './Profile.scss';

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            posts: []
        }
    }
    async componentDidMount(){
        let userData = await axios.get(`/users/${this.props.match.params.username}`).then(res => res.data[0])
        let postData = await axios.get(`/posts/user/${this.props.match.params.username}`).then(res => res.data)

        this.setState({
            user: userData,
            posts: postData
        })
    }

    render(){
        const { user, posts } = this.state;
        console.log('profile page data -->', user, posts)
        const displayUserPosts = posts.map(post => {
            return <div>
                <UserPosts post={post}/>
            </div>
        })
        return (
            <div>
                <div className="profile-container">
                    <div>
                        <h3>{user.username}</h3>
                    </div>
                    <div className='followers-picture'>
                        <div className="follows">
                            <b>Followers</b>
                            <p>200</p>
                        </div>
                        <div>
                            <img src={user.profile_picture} alt="profile"/>
                        </div>
                        <div className="follows">
                            <b>Following</b>
                            <p>130</p>
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
                    <b style={{fontSize: '30px', margin: '0 auto', textAlign: 'center'}}>POSTS</b>
                    <div className='post-display'>
                        {displayUserPosts}
                    </div>
            </div>
        )
    }
}

export default Profile;
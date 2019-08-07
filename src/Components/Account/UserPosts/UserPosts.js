import React from 'react';
import './UserPosts.scss';

function UserPosts(props){
    const { post } = props;
    return (
        <div>
            <img src={post.post_photo} />
        </div>
    )
}

export default UserPosts;
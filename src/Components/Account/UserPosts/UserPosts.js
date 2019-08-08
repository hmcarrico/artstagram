import React from 'react';
import { Link } from 'react-router-dom';
import './UserPosts.scss';

function UserPosts(props){
    const { post } = props;
    return (
        <div>
            <Link to={`/post/${post.post_id}`}>
                <img src={post.post_photo} />
            </Link>
        </div>
    )
}

export default UserPosts;
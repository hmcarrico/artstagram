import React, { Component } from 'react';
import axios from 'axios';
import './DetailedPost.scss';

class DetailedPost extends Component{
    constructor(){
        super();
        this.state = {
            post: [],
            comments: []
        }
    }
    async componentDidMount(){
        const { postId } = this.props.match.params;
        const postData = await axios.get(`/posts/detailed/${postId}`).then(res => [res.data])
        const commentData = await axios.get(`/comments/get_comments_for_post/${postId}`).then(res => res.data);
        this.setState({
            post: postData,
            comments: commentData
        })
    }
    render(){
        const { post, comments } = this.state;
        const displayPost = post.map(post => {
            return <div className="detailed-post-container">
                <button onClick={() => this.props.history.goBack()}>Back</button>
                <div>
                    <img src={post.post_photo} />
                </div>
                <div>
                    <img
                        src={post.profile_picture}
                        className='post-profile-pic'
                    />
                    <p>{post.description}</p>
                </div>
            </div>
        })
        const displayComments = comments.map(comment => {
            return <div className="detailed-comment-container">
                <img
                    src={comment.profile_picture}
                    className='comment-profile-pic'
                />
                <p>{comment.comment}</p>
            </div>
        })
        return (
            <div>
                {displayPost}
                <hr />
                <div>
                    <div className="comment-heading">
                        <h1>Comments</h1>
                    </div>
                    <div>
                        {displayComments}
                    </div>
                    <div className="post-comment-container">
                        <div>
                            <input
                                placeholder="Add a comment..."
                            />
                        </div>
                        <div>
                            <button>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedPost;
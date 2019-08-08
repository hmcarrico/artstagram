import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './DetailedPost.scss';

class DetailedPost extends Component{
    constructor(){
        super();
        this.state = {
            post: [],
            comments: [],
            commentText: null
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

    postComment = () => {
        const { postId } = this.props.match.params;
        const { commentText } = this.state;
        const { user } = this.props;
        const commentDataToSend = {
            postId,
            comment: commentText,
            userId: user.user_id
        }
        if(commentText){
            axios.post('/comments/create', commentDataToSend).then(res => {
                this.setState({
                    commentText: null,
                    comments: res.data
                })
            })
        }
    }

    render(){
        console.log('hehe-->', this.state)
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
            <div className="full-comment-container">
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
                                onChange={(e) => this.setState({commentText: e.target.value})}
                            />
                        </div>
                        <div>
                            <button onClick={this.postComment}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(DetailedPost);
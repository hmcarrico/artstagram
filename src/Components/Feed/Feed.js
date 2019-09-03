import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import './Feed.scss';

class Feed extends Component{
    constructor(){
        super();
        this.state = {
            feed: []
        }
    }

    componentDidMount(){
        this.getFeed()
    }

    getFeed = () => {
        const { user_id } = this.props.user;
        axios.get(`/posts/feed/${user_id}`).then(res => {
            console.log(res.data)
            this.setState({
                feed: res.data
            })
        })
    }

    render(){
        const { feed } = this.state;
        const displayFeed = feed.map(post => {
            const datePosted = new Date(post.date)
            return (
                <div className="inner-post-container">
                    <img src={post.post_photo} />
                    {DateFormat(datePosted, "mm dd")}
                </div>
            )
        })
        return (
            <div className='feed-container'>
                <h1>Feed</h1>
                {displayFeed}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(Feed);
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Stats.scss';

class Stats extends Component{
    constructor(){
        super();
        this.state = {
            followRequest: []
        }
    }

    componentDidMount(){
        axios.get(`/follows/getfollowrequest/${this.props.user.user_id}`).then(res => {
            this.setState({
                followRequest: res.data
            })
        })
    }


    render(){
        return (
            <div className='follow-fequest-container'>
                <div>
                    <Link to={`/request/${this.props.user.username}`}>
                        <h4>Follow Request</h4>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.userReducer
}

export default connect(mapStateToProps)(Stats);
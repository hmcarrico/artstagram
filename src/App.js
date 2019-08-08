import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './ducks/reducers/userReducer';
import axios from 'axios';
import routes from './routes';
import Header from './Components/Navigation/Header/Header';
import BottomNav from './Components/Navigation/BottomNav/BottomNav';
import './App.css';

class App extends Component {
  componentDidMount(){
    axios.get('/users/usersession').then(res => {
      console.log('REMEMBER TO CONNECT APP JS TO REDUX')
      // this.props.setUser(res.data)
    })
  }

  render(){
    return (
      <div className='app'>
        {
          this.props.location.pathname !== "/" &&
          <Header />
        }
        {routes}
        {
          this.props.location.pathname !== "/" &&
          <BottomNav />
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(withRouter(App));

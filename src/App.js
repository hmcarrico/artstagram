import React from 'react';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.css';

function App(props) {
  return (
    <div className='app'>
      {
        props.location.pathname !== "/" &&
        <Header />
      }
      {routes}
    </div>
  );
}

export default withRouter(App);

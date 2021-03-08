import React from 'react';
import Navbar from './Navbar';
import SignIn from './SignIn';
import Home from './Home';
import Profile from './Profile';
import LogIn from './LogIn';
import {Route, BrowserRouter as Router} from 'react-router-dom';

export default function App(props) {
  return(
    <Router>
      <Navbar />
      <Route path="/" exact component={Home}/>
      <Route path="/SignIn" component={SignIn}/>
      <Route path="/Inside" component={LogIn}/>
      <Route path="/Profile" component={Profile}/>
    </Router>
  )
}
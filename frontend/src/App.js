import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import topBanner from './topbanner.jpg';
import Index from './containers/IndexContainer';
import AdminRoute from './containers/AdminRouteContainer';
import LoggedInRoute from './containers/LoggedInRouteContainer';
import AddRepFormContainer from './containers/AddRepFormContainer';
import Register from './containers/RegisterContainer';
import Login from './containers/LoginContainer';
import Profile from './containers/ProfileContainer';
import SideBar from './containers/SideBarContainer';

export default () => (
  <div className="App">
    <header className="App-header">
      <Link href="/" to="/"><img src={topBanner} className="App-top-banner" alt="Top banner" /></Link>
    </header>
    <SideBar />
    <div className="App-content">
      <Route path="/" exact component={Index} />
      <AdminRoute path="/addRep"><AddRepFormContainer /></AdminRoute>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <LoggedInRoute path="/profile"><Profile /></LoggedInRoute>
    </div>
  </div>
);

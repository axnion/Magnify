import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import topBanner from './topbanner.jpg';
import AdminRoute from './containers/AdminRouteContainer';
import AddRepFormContainer from './containers/AddRepFormContainer';
import Login from './containers/LoginContainer';
import Profile from './containers/ProfileContainer';
import SideBar from './containers/SideBarContainer';

export default () => (
  <div className="App">
    <header className="App-header">
      <Link to="/"><img src={topBanner} className="App-top-banner" alt="Top banner" /></Link>
    </header>
    <SideBar />
    <div className="App-content">
      <AdminRoute path="/addRep"><AddRepFormContainer /></AdminRoute>
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
    </div>
  </div>
);

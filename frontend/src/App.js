import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';


import './App.css';
import topBanner from './topbanner.jpg';
import leftside from './leftside.jpg';
import AdminRoute from './containers/AdminRouteContainer';
import AddRepFormContainer from './containers/AddRepFormContainer';
import Login from './containers/LoginContainer';

// Put this here to add background image, all other css is in css file
const SideBar = styled('div')`
  width: 178px;
  height: 671px;
  background-image: url(${leftside});
  border-right: 1px solid black;
  float: left;
  text-align: center;
`;

export default () => (
  <div className="App">
    <header className="App-header">
      <Link to="/"><img src={topBanner} className="App-top-banner" alt="Top banner" /></Link>
    </header>
    <SideBar>
      <Link to="/login"><button className="sidebar-btn">Log in</button></Link><br />
      <Link to="/addRep"><button className="sidebar-btn">Add representative</button></Link>
    </SideBar>
    <div className="App-content">
      <AdminRoute path="/addRep"><AddRepFormContainer /></AdminRoute>
      <Route path="/login" component={Login} />
    </div>
  </div>
);

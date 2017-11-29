import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import topBanner from './topbanner.jpg';
import Index from './containers/IndexContainer';
import AdminRoute from './containers/AdminRouteContainer';
import LoggedInRoute from './containers/LoggedInRouteContainer';
import AddRepForm from './containers/AddRepFormContainer';
import AddProduct from './containers/AddProductContainer';
import AddMaterial from './containers/AddMaterialContainer';
import Register from './containers/RegisterContainer';
import Login from './containers/LoginContainer';
import Profile from './containers/ProfileContainer';
import SideBar from './containers/SideBarContainer';
import ProductsList from './containers/ProductsListContainer';
import ProductView from './containers/ProduktViewContainer';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default () => (
  <MuiThemeProvider>
  <div className="App">
    <header className="App-header">
      <Link to="/"><img src={topBanner} className="App-top-banner" alt="Top banner" /></Link>
    </header>
    <SideBar />
    <div className="App-content">
      <Route path="/" exact component={Index} />
      <AdminRoute path="/addRep"><AddRepForm /></AdminRoute>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/products" component={ProductsList} />
      <LoggedInRoute path="/profile"><Profile /></LoggedInRoute>
      <LoggedInRoute path="/Product"><AddProduct /></LoggedInRoute>
      <Route path="/material" component={AddMaterial} />
      <Route path="/ProductView/:id" component={ProductView} />
    </div>
  </div>
  </MuiThemeProvider>
);

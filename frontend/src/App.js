import React from 'react';
import { Link, Route} from 'react-router-dom'

import './App.css'
import topBanner from './topbanner.jpg';
import leftside from './leftside.jpg';
import AddRepFormContainer from './containers/AddRepFormContainer.js'

//Put this here to add background image, all other css is in css file
const sideBarStyle = {
  width: "178px",
  height: "671px",
  backgroundImage: "url(" + leftside + ")",
  borderRight: "1px solid black",
  float: "left",
  textAlign: "center",
}

export default () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/"><img src={topBanner} className="App-top-banner" alt="Top banner" /></Link>
      </header>
      <div style={sideBarStyle}>
        <Link to="/addRep"><button className="sidebar-btn">Add representative</button></Link>
      </div>
      <div className="App-content">
        <Route path="/addRep" component={AddRepFormContainer} />
      </div>
    </div>
  )
}
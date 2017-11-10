import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as exampleActions from './actions/example';
import logo from './logo.svg';
import './App.css';
import topBanner from './topbanner.jpg';
import leftside from './leftside.jpg';

const mapStateToProps = state => ({
  examples: state.example.examples,
  error: state.example.error,
  isWaiting: state.example.isWaiting,
});

const propTypes = {
  examples: PropTypes.arrayOf(PropTypes.any),
};

//Put this here to add background image, all other css is in css file
const sideBarStyle = {
  width: "178px",
  height: "671px",
  backgroundImage: "url(" + leftside + ")",
  borderRight: "1px solid black",
  float: "left",
}

class App extends Component {
  componentWillMount() {
    this.props.getExamples();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={topBanner} className="App-top-banner" alt="Top banner" />
        </header>
        <div style={sideBarStyle}>
          <button>Add representative</button>
        </div>
        <div className="App-content">
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect(mapStateToProps, exampleActions)(App);
//className="App-side-bar-left"
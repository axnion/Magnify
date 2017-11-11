import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExamples } from './actions/example';
import { mockCreateCompany } from './actions/company';
import logo from './logo.svg';
import './App.css';
import topBanner from './topbanner.jpg';
import leftside from './leftside.jpg';
import AddRepresentativeForm from './AddRepresentativeForm';

const mapStateToProps = state => ({
  examples: state.example.examples,
  companies: state.company.companies,
  error: state.example.error,
  isWaiting: state.example.isWaiting,
});

const bindActions = dispatch => ({
  getExamples: () => dispatch(getExamples()),
  mockCreateCompany: (data) => dispatch(mockCreateCompany(data)),
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
  textAlign: "center",
}

class App extends Component {
  componentWillMount() {
    console.log("mounting");
    this.props.getExamples();
    this.props.mockCreateCompany({ name: 'TestCompany' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={topBanner} className="App-top-banner" alt="Top banner" />
        </header>
        <div style={sideBarStyle}>
          <button className="sidebar-btn">Add representative</button>
        </div>
        <div className="App-content">
          <AddRepresentativeForm onClick={()=> console.log("hej")}/>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect(mapStateToProps, bindActions)(App);
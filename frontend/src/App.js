import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as exampleActions from './actions/example';
import logo from './logo.svg';
import './App.css';

const mapStateToProps = state => ({
  examples: state.example.examples,
  error: state.example.error,
  isWaiting: state.example.isWaiting,
});

const propTypes = {
  examples: PropTypes.arrayOf(PropTypes.any),
};

class App extends Component {
  componentWillMount() {
    this.props.getExamples();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          List of example documents:
        </p>
        <ul>
        {
          this.props.examples.map(example => (
            <li key={example._id}>{example.title}: {example.body}</li>
          ))
        }
        </ul>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect(mapStateToProps, exampleActions)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateThread from '../components/CreateThread';
import { mockCreateThread } from '../actions/thread'; // change here to use non mock action

const createThread = mockCreateThread; // change here to use non mock action

class CreateThreadContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      snackbarError: false,
      snackbarSuccess: false,
    };
  }

  render() {
    return (
      <CreateThread
        {...this.state}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = () => ({
});

const mapStateToProps = state => ({
  error: state.thread.error,
  isWaiting: state.thread.isWaiting,
  auth: state.auth,
});

CreateThreadContainer.propTypes = ({
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  sendThread: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
});

CreateThreadContainer.defaultProps = ({
  error: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateThreadContainer);

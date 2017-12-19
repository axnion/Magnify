import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetCurrentThread, getAThread } from '../actions/thread';

import ThreadView from '../components/thread/ThreadView';

// const getAThread = mockGetAThread;

class ThreadViewContainer extends Component {
  componentWillMount() {
    this.props.getAThread(this.props.match.params.id, this.props.token);
  }

  componentWillUnmount() {
    this.props.resetCurrentThread();
  }

  render() {
    return (
      <ThreadView
        {...this.props}
      />
    );
  }
}

ThreadViewContainer.propTypes = ({
  getAThread: PropTypes.func.isRequired,
  resetCurrentThread: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  token: PropTypes.string,
});

ThreadViewContainer.defaultProps = ({
  token: null,
});

const mapDispatchToProps = dispatch => ({
  getAThread: (id, token) => dispatch(getAThread(id, token)),
  resetCurrentThread: () => dispatch(resetCurrentThread()),
});

const mapStateToProps = state => ({
  thread: state.thread.currentThread,
  username: state.auth.username,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThreadViewContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mockGetAThread } from '../actions/thread';

import ThreadView from '../components/thread/ThreadView';


class ThreadViewContainer extends Component {

  componentDidMount() {
    this.props.getAThread('543fdsfs');
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
});

const mapDispatchToProps = dispatch => ({
  getAThread: id => dispatch(mockGetAThread(id)),
});

const mapStateToProps = state => ({
  thread: state.thread.currentThread,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThreadViewContainer);

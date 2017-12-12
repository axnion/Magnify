import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAThread } from '../actions/thread';

import ThreadView from '../components/thread/ThreadView';


class ThreadViewContainer extends Component {
  componentWillMount() {
    this.props.getAThread(this.props.match.params.id);
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
});

const mapDispatchToProps = dispatch => ({
  getAThread: id => dispatch(getAThread(id)),
});

const mapStateToProps = state => ({
  thread: state.thread.currentThread,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThreadViewContainer);

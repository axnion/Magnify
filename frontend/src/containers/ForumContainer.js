import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getThreads } from '../actions/thread';

import Forum from '../components/Forum';

function filterThreads(filterBy, threads) {
  return threads.filter(thread => thread.title.includes(filterBy) ||
  thread.body.includes(filterBy));
}

class ForumContainer extends Component {
  componentDidMount() {
    this.props.getThreads();
  }

  render() {
    return (
      <Forum
        {...this.props}
      />
    );
  }
}

ForumContainer.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.any),
  getThreads: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
});

ForumContainer.defaultProps = ({
  threads: [],
});

const mapDispatchToProps = dispatch => ({
  getThreads: () => dispatch(getThreads()),
});

const mapStateToProps = state => ({
  threads: filterThreads(state.thread.filterBy, state.thread.threads),
  username: state.auth.username,
  isWaiting: state.thread.isWaiting,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForumContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getThreads } from '../actions/thread';

import Forum from '../components/Forum';

function threadPostsHasFilterTerm(posts, filterTerm) {
  return posts.reduce((accumulatedResult, post) => accumulatedResult || post.body.toLowerCase().includes(filterTerm), false);
}

function filterThreads(filterBy, threads) {
  const lowerCaseFilter = filterBy.toLowerCase();
  return threads.filter(thread => thread.title.toLowerCase().includes(lowerCaseFilter) ||
  thread.body.toLowerCase().includes(lowerCaseFilter) || threadPostsHasFilterTerm(thread.posts, lowerCaseFilter));
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
  unseenThreads: PropTypes.arrayOf(PropTypes.any),
  getThreads: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
});

ForumContainer.defaultProps = ({
  threads: [],
  unseenThreads: [],
});

const mapDispatchToProps = dispatch => ({
  getThreads: () => dispatch(getThreads()),
});

const mapStateToProps = state => ({
  threads: filterThreads(state.thread.filterBy, state.thread.threads),
  filterBy: state.thread.filterBy,
  unseenThreads: state.company.currentCompany.unseenThreads,
  username: state.auth.username,
  isWaiting: state.thread.isWaiting,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForumContainer);

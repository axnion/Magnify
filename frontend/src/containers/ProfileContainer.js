import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Profile from '../components/Profile';
import { getACompany } from '../actions/company';
import { getThreads } from '../actions/thread';

function threadPostsHasFilterTerm(posts, filterTerm) {
  return posts.reduce((accumulatedResult, post) => accumulatedResult && post.body.includes(filterTerm), false);
}

function filterThreads(filterBy, threads) {
  return threads.filter(thread => thread.title.includes(filterBy) ||
  thread.body.includes(filterBy) || threadPostsHasFilterTerm(thread.posts, filterBy));
}

class ProfileContainer extends Component {
  componentDidMount() {
    this.props.getThreads();
  }

  render() {
    return (
      <Profile
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getThreads: () => dispatch(getThreads()),
  getCompany: id => dispatch(getACompany(id)),
});

ProfileContainer.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.any),
  getThreads: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
});

ProfileContainer.defaultProps = ({
  threads: [],
});

const mapStateToProps = state => ({
  threads: filterThreads(state.thread.filterBy, state.thread.threads),
  username: state.auth.username,
  role: state.auth.role,
  companyId: state.auth.company,
  company: state.company.currentCompany,
  isWaiting: state.thread.isWaiting,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);

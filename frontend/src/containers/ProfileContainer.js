import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Profile from '../components/Profile';
import { getACompany } from '../actions/company';
import { getAccount } from '../actions/account';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
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
  getAccount: id => dispatch(getAccount(id)),
  getCompany: id => dispatch(getACompany(id)),
});

ProfileContainer.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.any),
  getAccount: PropTypes.func.isRequired,
  isWaiting: PropTypes.bool.isRequired,
});

ProfileContainer.defaultProps = ({
  threads: [],
});

const mapStateToProps = state => ({
  threads: state.account.activeThreads,
  username: state.auth.username,
  userID: state.auth.id,
  role: state.auth.role,
  companyId: state.auth.company,
  company: state.company.currentCompany,
  isWaiting: state.thread.isWaiting,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);

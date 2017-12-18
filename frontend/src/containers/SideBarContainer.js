import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getACompany } from '../actions/company';
import { logout } from '../actions/auth';

import SideBar from '../components/SideBar';

class SideBarContainer extends Component {

  constructor(props) {
    super(props);

    this.updateUnseen = this.updateUnseen.bind(this);
  }

  componentWillMount() {
    if (this.props.company) {
      this.props.getACompany(this.props.company);
    }
  }

  updateUnseen() {
    if (this.props.company) {
      this.props.getACompany(this.props.company);
    }
  }

  render() {
    return (
      <SideBar
        {...this.props}
        updateUnseen={this.updateUnseen}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getACompany: id => dispatch(getACompany(id)),
  logout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
  username: state.auth.username,
  role: state.auth.role,
  company: state.auth.company,
  unseenThreads: state.company.currentCompany.unseenThreads,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBarContainer);

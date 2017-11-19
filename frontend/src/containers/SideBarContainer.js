import { connect } from 'react-redux';

import { logout } from '../actions/auth';

import SideBar from '../components/SideBar';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

const mapStateToProps = state => ({
  username: state.auth.username,
  isAdmin: state.auth.isAdmin,
});

const SideBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar);

export default SideBarContainer;

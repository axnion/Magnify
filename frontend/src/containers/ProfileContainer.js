import { connect } from 'react-redux';

import Profile from '../components/Profile';

const mapDispatchToProps = () => ({
});

const mapStateToProps = state => ({
  username: state.auth.username,
  role: state.auth.role,
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContainer;

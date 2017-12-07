import { connect } from 'react-redux';

import Profile from '../components/Profile';
import { getACompany } from '../actions/company';

const mapDispatchToProps = dispatch => ({
  getCompany: (id) => {
    dispatch(getACompany(id));
  },
});

const mapStateToProps = state => ({
  username: state.auth.username,
  role: state.auth.role,
  companyId: state.auth.company,
  company: state.company.currentCompany,
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContainer;

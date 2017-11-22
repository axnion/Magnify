import { connect } from 'react-redux';

import AdminRoute from '../components/AdminRoute';

const mapStateToProps = (state, ownProps) => ({
  isWaiting: state.account.isWaiting,
  username: state.auth.username,
  role: state.auth.role,
  location: ownProps.path,
  routeProps: {
    exact: ownProps.exact,
    path: ownProps.path,
  },
});

const AdminRouteContainer = connect(
  mapStateToProps,
  null,
  null,
  { pure: false },
)(AdminRoute);

export default AdminRouteContainer;

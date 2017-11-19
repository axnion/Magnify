import { connect } from 'react-redux';

import LoggedInRoute from '../components/LoggedInRoute';

const mapStateToProps = (state, ownProps) => ({
  isWaiting: state.account.isWaiting,
  username: state.auth.username,
  location: ownProps.path,
  routeProps: {
    exact: ownProps.exact,
    path: ownProps.path,
  },
});

const LoggedInRouteContainer = connect(
  mapStateToProps,
  null,
  null,
  { pure: false },
)(LoggedInRoute);

export default LoggedInRouteContainer;

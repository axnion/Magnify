import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({
  routeProps,
  username,
  role,
  children,
  isWaiting,
  location,
}) => (
  <Route
    {...routeProps}
    render={() => (
      username !== null && role === 'companyAdmin' ? (
        <div>{children}</div>
      ) : !isWaiting && (
        <Redirect to={{
          pathname: '/login',
          from: location,
          message: 'Administrators only. Please log in as an administrator.',
        }}
        />
      )
    )}
  />
);

AdminRoute.propTypes = {
  routeProps: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }).isRequired,
  username: PropTypes.string,
  role: PropTypes.string,
  children: PropTypes.node.isRequired,
  isWaiting: PropTypes.bool,
  location: PropTypes.string.isRequired,
};

AdminRoute.defaultProps = {
  role: null,
  isWaiting: false,
  username: null,
};

export default AdminRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoggedInRoute = ({
  routeProps,
  username,
  children,
  isWaiting,
  location,
}) => (
  <Route
    {...routeProps}
    render={() => (
      username !== null ? (
        <div>{children}</div>
      ) : !isWaiting && (
        <Redirect to={{
          pathname: '/login',
          from: location,
          message: 'You need to log in to view this page.',
        }}
        />
      )
    )}
  />
);

LoggedInRoute.propTypes = {
  routeProps: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }).isRequired,
  username: PropTypes.string,
  children: PropTypes.node.isRequired,
  isWaiting: PropTypes.bool,
  location: PropTypes.string.isRequired,
};

LoggedInRoute.defaultProps = {
  isWaiting: false,
  username: null,
};

export default LoggedInRoute;

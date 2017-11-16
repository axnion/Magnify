import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({
  routeProps,
  username,
  isAdmin,
  children,
  isWaiting,
  location,
}) => (
  <Route
    {...routeProps}
    render={() => (
      username !== null && isAdmin ? (
        <div>{children}</div>
      ) : !isWaiting && (
        <Redirect to={{
          pathname: '/login',
          from: location,
          message: 'Administrators only. Please log in.',
        }}
        />
      )
    )}
  />
);

export default AdminRoute;

import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <h1>Username: {this.props.username}</h1>
        <h3>Type of user: { this.props.isAdmin ? 'Admin' : 'User' }</h3>
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  isAdmin: PropTypes.bool,
};

Profile.defaultProps = {
  username: null,
  isAdmin: false,
};
export default Profile;

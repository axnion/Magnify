import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  roleToString() {
    if (this.props.role === 'companyAdmin') {
      return 'Admin';
    } else if (this.props.role === 'companyRep') {
      return 'Company Representative';
    }
    return 'User';
  }

  render() {
    return (
      <div className="profile">
        <h1>Username: {this.props.username}</h1>
        <h3>Type of user: { this.roleToString()}</h3>
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
};

Profile.defaultProps = {
  username: null,
  role: null,
};
export default Profile;

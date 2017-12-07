import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.getCompany = props.getCompany;
  }

  componentWillMount() {
    if (this.props.companyId) {
      this.getCompany(this.props.companyId);
    }
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
        {
          (!this.props.companyId || !this.props.company)? undefined : <h3>Company: {this.props.company.name}</h3>
        }
        <h3>Type of user: { this.roleToString()}</h3>
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  companyId: PropTypes.string,
  company: PropTypes.object,
  getCompany: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  username: null,
  role: null,
  company: null,
  companyId: null,
};
export default Profile;

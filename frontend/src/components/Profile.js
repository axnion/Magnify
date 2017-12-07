import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import { Card, CardHeader } from 'material-ui/Card'; 

const ColoredCardHeader = styled(CardHeader)`
  background-color: #BBDEFB;
`;

const StyledCard = styled(Card)`
padding: 0px;
margin: 10px;
min-height: 155px;
`;

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
      <StyledCard className="profile">
        <ColoredCardHeader
          title={`Username: ${this.props.username}`} 
          subtitle={(!this.props.companyId || !this.props.company) ? undefined : `Company: ${this.props.company.name}`} 
        />
        <h3>Type of user: { this.roleToString()}</h3>
      </StyledCard>
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

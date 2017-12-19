import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ActionWork from 'material-ui/svg-icons/action/work';

import ThreadList from '../components/thread/ThreadList';

const StyledCard = styled(Card)`
  margin: 10px;
`;

const MainDiv = styled('div')`
  padding: 10px;
`;

const HeaderText = styled('h2')`
  padding-top: 20px;
`;

const CenteredCardText = styled(CardText)`
  display: flex;
  align-items: center;
`;

const iconStyles = {
  marginRight: 15,
  color: 'rgb(188, 188, 188)',
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.getAccount = props.getAccount;
    this.getCompany = props.getCompany;
  }

  componentWillMount() {
    this.getAccount(this.props.userID);
    if (this.props.companyId) {
      this.getCompany(this.props.companyId);
    }
  }

  roleToString() {
    if (this.props.role === 'companyAdmin') {
      return 'Administrator';
    } else if (this.props.role === 'companyRep') {
      return 'Company Representative';
    }
    return 'User';
  }

  avatarLetter() {
    return this.props.username.substring(0, 1).toUpperCase();
  }

  render() {
    return (
      <MainDiv>
        <StyledCard className="profile">
          <CardHeader
            title={this.props.username}
            subtitle={this.roleToString()}
            avatar={<Avatar>{this.avatarLetter()}</Avatar>}
          />
          {(!this.props.companyId || !this.props.company) ? undefined :
          <CenteredCardText>
            <ActionWork style={iconStyles} />
            {this.props.company.name}
          </CenteredCardText>
          }
        </StyledCard>
        <div className="threadContainer">
          <HeaderText>Active threads</HeaderText>
          <ThreadList
            {...this.props}
          />
        </div>
      </MainDiv>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  userID: PropTypes.string,
  role: PropTypes.string,
  companyId: PropTypes.string,
  company: PropTypes.shape({
    name: PropTypes.string,
  }),
  getCompany: PropTypes.func.isRequired,
  getAccount: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  username: null,
  userID: null,
  role: null,
  company: null,
  companyId: null,
};
export default Profile;

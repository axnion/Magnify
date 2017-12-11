import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import { Card, CardHeader, CardText } from 'material-ui/Card';

const StyledCard = styled(Card)`
border-bottom: 2px solid black;
`;

const ColoredCardHeader = styled(CardHeader)`
background-color: #BBDEFB;
`;

const StyledCardText = styled(CardText)`
`;

const ThreadHead = (props) => {
  const {
    title, body, author, createdAt,
  } = props;

  const date = new Date(createdAt);
  const companyName = (!author.company) ? '' : author.company.name;
  const subtitle = `${author.username} ${companyName} ${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()} `;

  return (
    <StyledCard>
      <ColoredCardHeader
        title={title}
        subtitle={subtitle}
      />
      { body ?
        <StyledCardText style={{ fontWeight: 'bold' }} >
          {body}
        </StyledCardText> :
        undefined }
    </StyledCard>
  );
};

ThreadHead.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.shape({
    username: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  createdAt: PropTypes.string,
};

ThreadHead.defaultProps = {
  title: '',
  body: null,
  author: null,
  createdAt: '',
};

export default ThreadHead;

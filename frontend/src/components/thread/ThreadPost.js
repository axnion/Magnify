import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import { Card, CardHeader, CardText } from 'material-ui/Card';

const StyledCard = styled(Card)`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 5px;
`;

const ThreadPost = (props) => {
  const {
    body, author, createdAt,
  } = props;

  const date = new Date(createdAt);
  const companyName = (!author.company) ? '' : `, ${author.company.name}`;
  const title = `${author.username}${companyName}`;
  const subtitle = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()} `;

  return (
    <StyledCard>
      <CardHeader
        title={title}
        subtitle={subtitle}
      />
      <CardText>
        {body}
      </CardText>
    </StyledCard>
  );
};

ThreadPost.propTypes = {
  body: PropTypes.string,
  author: PropTypes.shape({
    username: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  createdAt: PropTypes.string,
};

ThreadPost.defaultProps = {
  body: '',
  author: null,
  createdAt: '',
};

export default ThreadPost;

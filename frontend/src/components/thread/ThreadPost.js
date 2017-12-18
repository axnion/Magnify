import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import { Card, CardHeader, CardText } from 'material-ui/Card';
import LightBulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';

const StyledCard = styled(Card)`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 5px;
`;

const ThreadPost = (props) => {
  const {
    body, author, createdAt, marked,
  } = props;

  const date = new Date(createdAt);
  const companyName = (!author.company) ? '' : `, ${author.company.name}`;
  const title = `${author.username}${companyName}`;
  const subtitle = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()} `;
  const icon = marked ? <LightBulbOutline /> : undefined;
  const markedColor = marked ? '#C5E1A5' : undefined;

  return (
    <StyledCard>
      <CardHeader
        title={title}
        subtitle={subtitle}
        avatar={icon}
        style={{ backgroundColor: markedColor }}
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
  marked: PropTypes.bool,
};

ThreadPost.defaultProps = {
  body: '',
  author: null,
  createdAt: '',
  marked: false,
};

export default ThreadPost;

import React from 'react';
import PropTypes from 'prop-types';

// Material-ui
import { Card, CardHeader, CardText } from 'material-ui/Card';

const ThreadPost = (props) => {
  const {
    body, author, createdAt,
  } = props;

  const date = new Date(createdAt);
  const companyName = (!author.company) ? '' : author.company.name;
  const title = `${author.username} ${companyName}`;
  const subtitle = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()} `;

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle}
      />
      <CardText>
        {body}
      </CardText>
    </Card>
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

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Material-ui
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const StyledCard = styled(Card)`
  margin-bottom: 2px;
`;

const ColoredCardHeader = styled(CardHeader)`
  // background-color: #BBDEFB;
`;

const StyledCardText = styled(CardText)`
`;

const ThreadHead = (props) => {
  const {
    title, body, author, createdAt, customStyle, product,
  } = props;
  const date = new Date(createdAt);
  const companyName = (!author.company) ? '' : author.company.name;
  const subtitle = `${author.username} ${companyName}, ${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()} `;

  return (
    <StyledCard
      style={customStyle}
    >
      <ColoredCardHeader
        title={title}
        subtitle={subtitle}
      />
      { body ?
        <StyledCardText >
          {body}
        </StyledCardText> :
        undefined }
      { product ?
        <Link to={`/productView/${product._id}`}>
          <RaisedButton primary label={`${product.name}`} />
        </Link> :
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
  product: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
  createdAt: PropTypes.string,
};

ThreadHead.defaultProps = {
  title: '',
  body: null,
  author: null,
  createdAt: '',
  product: null,
};

export default ThreadHead;

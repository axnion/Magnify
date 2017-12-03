import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GetApp from 'material-ui/svg-icons/action/get-app';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import config from '../config';
import StarRating from './StarRating';
import ShowRating from './ShowRating';


const StyledCard = styled(Card)`
  padding: 25px;
  margin: 10px;
  min-height: 155px;
`;

const StyledFloatingActionButton = styled(FloatingActionButton)`
  float: right;
  margin-top: 50px;
  z-index: 444;
`;

const StyledCardActions = styled(CardActions)`
  max-width: 75%;
`;

const MaterialCardComponent = ({ material, showRateStars, averageScore, numberOfRatings }) => (
  <StyledCard>
    <StyledFloatingActionButton download href={`${config.serverURI}${material.url}`}>
      <GetApp />
    </StyledFloatingActionButton>
    <CardHeader actAsExpander showExpandableButton title={material.title} />
    <StyledCardActions>
      {
              numberOfRatings === 0 ? undefined : <ShowRating averageScore={averageScore} numberOfRatings={numberOfRatings} />
          }
      {
              !showRateStars ? undefined : StarRating({ rating: 3, function() {} })
          }
    </StyledCardActions>
    <CardText expandable>
      <TextField
        hintText="Enter personal notes here"
        floatingLabelText="Notes"
        fullWidth
        multiLine
        rows={2}
        rowsMax={6}
      />
    </CardText>
  </StyledCard>
);

MaterialCardComponent.propTypes = {
  material: PropTypes.object, // eslint-disable-line
  showRateStars: PropTypes.bool,
  averageScore: PropTypes.number,
  numberOfRatings: PropTypes.number,
};

MaterialCardComponent.defaultProps = {
  material: null,
  showRateStars: false,
  averageScore: 0,
  numberOfRatings: 0,
};

export default MaterialCardComponent;

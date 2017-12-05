import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GetApp from 'material-ui/svg-icons/action/get-app';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Save from 'material-ui/svg-icons/content/save';

import config from '../config';
import StarRating from './StarRating';
import ShowRating from './ShowRating';


const StyledCard = styled(Card)`
  padding: 0px;
  margin: 10px;
  min-height: 155px;
`;

const StyledFloatingActionButton = styled(FloatingActionButton)`
  float: right;
  margin-top: 60px;
  margin-right: 10px;
`;

const StyledCardActions = styled(CardActions)`
  max-width: 75%;
`;

const StyledCardAction = styled('div')`
  float: left;
`;

const ColoredCardHeader = styled(CardHeader)`
    background-color: #BBDEFB;
`;

const SaveButton = styled(FloatingActionButton)`
  float: right;
  margin-right: -10px;
`;

const MaterialCardComponent = ({
  material, showRateStars, averageScore, numberOfRatings, annotation, saveAnnotation,
}) => (
  <StyledCard>
    <StyledFloatingActionButton download href={`${config.serverURI}${material.url}`}>
      <GetApp />
    </StyledFloatingActionButton>
    <ColoredCardHeader actAsExpander showExpandableButton title={material.title} />
    <StyledCardActions>
      <StyledCardAction>
        {
        numberOfRatings === 0 ? undefined : <ShowRating averageScore={averageScore} numberOfRatings={numberOfRatings} />
      }
      </StyledCardAction>
      <StyledCardAction>
        {
        !showRateStars ? undefined : StarRating({ rating: 3, function() {} })
      }
      </StyledCardAction>
    </StyledCardActions>
    <CardText expandable>
      <TextField
        hintText="Enter personal notes here"
        defaultValue={annotation ? annotation.annotation : ''}
        floatingLabelText="Notes"
        fullWidth
        multiLine
        rows={1}
        rowsMax={6}
        id="AnnotationTextField"
        // onChange={(event, value) => this.setState({ annotation: value })}
      />
      <SaveButton onClick={() => saveAnnotation(document.getElementById('AnnotationTextField').value, material._id)}>
        <Save />
      </SaveButton>
    </CardText>
  </StyledCard>
);

MaterialCardComponent.propTypes = {
  material: PropTypes.object, // eslint-disable-line
  showRateStars: PropTypes.bool,
  averageScore: PropTypes.number,
  numberOfRatings: PropTypes.number,
  annotation: PropTypes.string,
  saveAnnotation: PropTypes.func.isRequired,
};

MaterialCardComponent.defaultProps = {
  material: null,
  showRateStars: false,
  averageScore: 0,
  numberOfRatings: 0,
  annotation: '',
};

export default MaterialCardComponent;

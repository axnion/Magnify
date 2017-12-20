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
  margin-left: 0px;
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
  material, showRateStars, annotation, saveAnnotation, saveRating,
}) => (
  <StyledCard>
    <StyledFloatingActionButton
      download
      href={`${config.serverURI}${material.url}`}
    >
      <GetApp />
    </StyledFloatingActionButton>
    <ColoredCardHeader
      actAsExpander
      showExpandableButton
      title={material.title}
    />
    <StyledCardActions>
      <StyledCardAction>
        {
          material.numRatings === 0 ? undefined : <ShowRating averageScore={material.avgRating} numberOfRatings={material.numRatings} />
        }
      </StyledCardAction>
      <StyledCardAction>
        {
          !showRateStars ? undefined : StarRating({ rating: material.userRating, saveRating, materialId: material._id })
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
        id={`AnnotationTextField${material._id}`}
      />
      <SaveButton
        onClick={() => saveAnnotation(document.getElementById(`AnnotationTextField${material._id}`).value, material._id)}
      >
        <Save />
      </SaveButton>
    </CardText>
  </StyledCard>
);

MaterialCardComponent.propTypes = {
  material: PropTypes.object, // eslint-disable-line
  showRateStars: PropTypes.bool,
  annotation: PropTypes.object, // eslint-disable-line
  saveAnnotation: PropTypes.func.isRequired,
  saveRating: PropTypes.func.isRequired,
};

MaterialCardComponent.defaultProps = {
  material: null,
  showRateStars: false,
};

export default MaterialCardComponent;

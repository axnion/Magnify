import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Download from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';

import config from '../config';
import StarRating from './StarRating';
import ShowRating from './ShowRating';


const DownloadLink = styled('a')`
    margin: 15px;
`;

const StyledCard = styled(Card)`
    padding: 0px;
    margin: 20px;
`;

const StyledCardActions = styled(CardActions)`
    height: 50px;
    padding: 10px;
`;

const CardAction = styled('div')`
    float: left;
    display: inline;
`;

const ColoredCardHeader = styled(CardHeader)`
    background-color: #BBDEFB;
`;


const MaterialCardComponent = ({ material, showRateStars, averageScore, numberOfRatings }) => (
  <StyledCard>
    <ColoredCardHeader actAsExpander showExpandableButton title={material.title} />
    <StyledCardActions>
      <CardAction>
        <DownloadLink download href={`${config.serverURI}${material.url}`} className="material-download">
          <Download />
        </DownloadLink>
      </CardAction>
      <CardAction>
        {
                numberOfRatings === 0 ? undefined : <ShowRating averageScore={averageScore} numberOfRatings={numberOfRatings} />
            }
      </CardAction>
      <CardAction>
        {
                !showRateStars ? undefined : StarRating({ rating: 3, function() {} })
            }
      </CardAction>
    </StyledCardActions>
    <CardText expandable>
      <TextField
        hintText="Enter personal notes here"
        floatingLabelText="Notes"
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

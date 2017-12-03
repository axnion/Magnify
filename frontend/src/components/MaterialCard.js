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
    padding: 25px;
    margin: 10px;
`;

const MaterialCardComponent = ({ material, showRateStars, averageScore, numberOfRatings }) => (
  <StyledCard>
    <CardHeader actAsExpander showExpandableButton title={material.title} />
    <CardActions>
      <div>
        <DownloadLink download href={`${config.serverURI}${material.url}`} className="material-download">
          <Download />
        </DownloadLink>
        <div>
          {
                numberOfRatings === 0 ? undefined : <ShowRating averageScore={averageScore} numberOfRatings={numberOfRatings} />
            }
          {
                !showRateStars ? undefined : StarRating({ rating: 3, function() {} })
            }
        </div>
      </div>
    </CardActions>
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

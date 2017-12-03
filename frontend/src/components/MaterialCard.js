import React from 'react';
import PropTypes from 'prop-types';

// Material-ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Download from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';

import config from '../config';
import StarRating from './StarRating';


const MaterialCardComponent = ({material, showRateStars}) => (
    <Card>
        <CardHeader actAsExpander={true} showExpandableButton={true} title={material.title}>
        </CardHeader>
        <CardActions>
        <a download href={`${config.serverURI}${material.url}`} className='material-download'>
          <Download />
        </a>  
            {
                !showRateStars ? undefined : StarRating({rating: 3, function(){}})
            }
        </CardActions>
        <CardText expandable={true}>
            <TextField 
                hintText='Enter personal notes here'
                floatingLabelText='Notes'
            />
        </CardText>
    </Card>    
)

MaterialCardComponent.propTypes = {
    material: PropTypes.object, //eslint-disable-line
    showRateStars: PropTypes.bool,
  };

export default MaterialCardComponent;
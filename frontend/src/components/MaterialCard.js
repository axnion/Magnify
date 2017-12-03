import React from 'react';
import PropTypes from 'prop-types';

// Material-ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Download from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';

import config from '../config';
import StarRating from './StarRating';
import ShowRating from './ShowRating';

const cardStyle = {
    padding: 25,
};

const downloadStyle = {
    margin: 15,
};


const MaterialCardComponent = ({material, showRateStars, averageScore, numberOfRatings}) => (
    <Card style={cardStyle}>
        <CardHeader actAsExpander={true} showExpandableButton={true} title={material.title}>
        </CardHeader>
        <CardActions>
        <div>
            <a style ={downloadStyle} download href={`${config.serverURI}${material.url}`} className='material-download'>
                <Download />
            </a>  
            <div>
            {
                numberOfRatings === 0 ? undefined : <ShowRating averageScore={averageScore} numberOfRatings={numberOfRatings}/>
            }
            {
                !showRateStars ? undefined : StarRating({rating: 3, function(){}})
            }
            </div>
        </div>
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
    averageScore: PropTypes.number,
    numberOfRatings: PropTypes.number
  };

export default MaterialCardComponent;
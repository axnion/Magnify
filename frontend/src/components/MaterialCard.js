import React from 'react';

// Material-ui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Download from 'material-ui/svg-icons/file/file-download';
import TextField from 'material-ui/TextField';

import config from '../config';
import StarRating from './StarRating';


const MaterialCardComponent = ({material}) => (
    <Card>
        <CardHeader actAsExpander={true} showExpandableButton={true} title={material.title}>
        <a download href={`${config.serverURI}${material.url}`} className='material-download'>
          <Download />
        </a>        
        </CardHeader>
        <CardActions>
            {StarRating({rating: 3, function(){}})}
        </CardActions>
        <CardText expandable={true}>
            <TextField 
                hintText='Enter personal notes here'
                floatingLabelText='Notes'
            />
        </CardText>
    </Card>    
)

export default MaterialCardComponent;
import React from 'react';

// Material-UI
import BorderStar from 'material-ui/svg-icons/toggle/star-border';
import FullStar from 'material-ui/svg-icons/toggle/star';
import {yellow600} from 'material-ui/styles/colors'; 
import Paper from 'material-ui/Paper';

const starStyle = {
    margin: 10,
    cursor: 'pointer', 
};

const paperStyle = {
    height: 45,
    width: 225,
    display: 'inline'
};


function StarRating(props) {
    
    let starsToDisplay = new Array(5);
    for(let i = 0; i < 5; i++)
        {
            if(i < props.rating)
            {
                starsToDisplay[i] = <FullStar style={starStyle} color={yellow600} onClick={() => props.onClick(i+1)}/>;                    
            } else {
                starsToDisplay[i] = <BorderStar style={starStyle} onClick={() => props.onClick(i+1)}/>;                                    
            }
        }
    
    const toReturn = (
    <div>
        <Paper rounded={true} zDepth={1} style={paperStyle}>
            {starsToDisplay[0]}
            {starsToDisplay[1]}
            {starsToDisplay[2]}
            {starsToDisplay[3]}
            {starsToDisplay[4]}
        </Paper>
    </div>
    );

    return toReturn;
};


export default StarRating;
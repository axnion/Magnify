import React from 'react';

// Material-UI
import Paper from 'material-ui/Paper';

const paperStyle = {
    height: 45,
    width: 100,
    tesxtAlign: 'center',
    display: 'inline',
    padding: 10,
};

const ShowRating = ({averageScore, numberOfRatings}) => (
    <div>
        <Paper rounded={true} zDepth={1} style={paperStyle}>
            {averageScore}/5 from {numberOfRatings} ratings
        </Paper>
    </div>
)

export default ShowRating;
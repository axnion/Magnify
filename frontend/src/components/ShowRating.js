import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Material-UI
import Paper from 'material-ui/Paper';

const divStyle = styled('div')`
    height: 45px,
    width: 100px,
    tesxtAlign: center,
    display: inline,
    padding: 10px,
`;

const ShowRating = ({averageScore, numberOfRatings}) => (
    <divStyle>
        {averageScore}/5 from {numberOfRatings} ratings
    </divStyle>
)

ShowRating.propTypes = {
    averageScore: PropTypes.number,
    numberOfRatings: PropTypes.number,
};

ShowRating.defaultProps = {
    averageScore: 0,
    numberOfRatings: 0,
};
export default ShowRating;
import React from 'react';

// Material-UI
import BorderStar from 'material-ui/svg-icons/toggle/star-border';
import FullStar from 'material-ui/svg-icons/toggle/star';
import { yellow600 } from 'material-ui/styles/colors';


const starStyle = {
  margin: 10,
  cursor: 'pointer',
};

function StarRating(props) {
  const starsToDisplay = new Array(5);
  for (let i = 0; i < 5; i += 1) {
    if (i < props.rating) {
      starsToDisplay[i] = <FullStar style={starStyle} color={yellow600} onClick={() => props.saveRating(i + 1, props.materialId)} />;
    } else {
      starsToDisplay[i] = <BorderStar style={starStyle} onClick={() => props.saveRating(i + 1, props.materialId)} />;
    }
  }

  const toReturn = (
    <div>
      {starsToDisplay[0]}
      {starsToDisplay[1]}
      {starsToDisplay[2]}
      {starsToDisplay[3]}
      {starsToDisplay[4]}
    </div>
  );

  return toReturn;
}


export default StarRating;

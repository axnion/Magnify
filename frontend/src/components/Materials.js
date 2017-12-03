import React from 'react';
import PropTypes from 'prop-types';

// Materials UI components
import Download from 'material-ui/svg-icons/file/file-download';
import { List, ListItem } from 'material-ui/List';

import StarRating from '../components/StarRating';

import config from '../config';

const Materials = ({ materials }) => (
  <List>
    {materials.map((material, key) =>
      (<ListItem key={key} >
        <a download href={`${config.serverURI}${material.url}`} className="material-download">
          <Download />
        </a>{material.title}
        {StarRating({ rating: 3, function() {} })/* Rating and function not implmented yet */}
      </ListItem>))}
  </List>
);

Materials.propTypes = {
  materials: PropTypes.array.isRequired, //eslint-disable-line
};

export default Materials;

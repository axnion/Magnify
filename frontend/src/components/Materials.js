import React from 'react';
import PropTypes from 'prop-types';

// Materials UI components
import { List, ListItem } from 'material-ui/List';
import Download from 'material-ui/svg-icons/file/file-download';

const Materials = ({ materials }) => (
  <List>
    {materials.map((material, key) =>
      <a key={key} href={material.url} className='material-download'><ListItem leftIcon={<Download />}>{material.title}</ListItem></a>)}
  </List>
);

Materials.propTypes = {
  materials: PropTypes.array.isRequired, //eslint-disable-line
};

export default Materials;

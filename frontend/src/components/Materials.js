import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Materials UI components
import {List, ListItem} from 'material-ui/List';
import Download from 'material-ui/svg-icons/file/file-download';

const Materials = ({ materials }) => (
  <List>
    {materials.map((material, key) =>
      <Link key={key} to={material.url} className='material-download'><ListItem leftIcon={<Download />}>Titel: {material.title}</ListItem></Link>)}
  </List>
);

Materials.propTypes = {
  materials: PropTypes.array.isRequired, //eslint-disable-line
};

export default Materials;
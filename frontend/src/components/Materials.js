import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Materials = ({ materials }) => (
  <ul>
    {materials.map((material, key) =>
      <li key={key}><Link to={material.url} className='material-download'>Titel: {material.title}</Link></li>)}
  </ul>
);

Materials.propTypes = {
  materials: PropTypes.array.isRequired, //eslint-disable-line
};

export default Materials;
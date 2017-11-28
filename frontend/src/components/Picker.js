import React from 'react';
import PropTypes from 'prop-types';

const Picker = ({ value, options, onChange }) => (
  <span>
    <p>Filter by company</p>
    <select onChange={e => onChange(e.target.value)} value={value}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </span>
);

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default Picker;

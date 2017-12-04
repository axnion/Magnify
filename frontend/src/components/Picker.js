import React from 'react';
import PropTypes from 'prop-types';

const Picker = ({ value, options, onChange, title, name }) => (
  <span>
    <p>{title}</p>
    <select onChange={onChange} value={value} name={name}>
      {options.map(option => (
        <option value={option._id} key={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  </span>
);

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Picker;

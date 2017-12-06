import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Picker = ({ value, options, onChange, title }) => (
  <span>
    <SelectField
      onChange={onChange}
      value={value}
      hintText="Select a category"
      floatingLabelText={title}
      floatingLabelStyle={{ color: 'black' }}
    >
      {options.map(option => (
        <MenuItem value={option._id} key={option._id} primaryText={option.name} />
      ))}
    </SelectField>
  </span>
);

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Picker;

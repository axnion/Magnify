import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function callback() {
  document.getElementById('SearchField').value = '';
}

const CreatePost = ({
  search,
  filterBy,
}) => (
  <div className="search">
    <TextField
      style={{ display: 'block', marginLeft: '22px', maxWidth: '800px' }}
      textareaStyle={{ display: 'block', position: 'absolute' }}
      hintText="Search here!"
      floatingLabelText="Search"
      fullWidth
      multiLine="false"
      id="SearchField"
    />
    <RaisedButton primary label="Search" onClick={() => search(document.getElementById('SearchField').value, callback)} />
    {filterBy ? <p>Showing search results for: &quot;{filterBy}&quot;</p> : ''}
  </div>
);


CreatePost.propTypes = {
  search: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
};

export default CreatePost;

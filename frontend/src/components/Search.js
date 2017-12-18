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
  clearSearch,
}) => (
  <div className="search">
    <TextField
      style={{ display: 'inline-block', marginLeft: '22px', maxWidth: '600px' }}
      textareaStyle={{ display: 'block', position: 'absolute' }}
      hintText="Search here!"
      fullWidth
      multiLine={false}
      id="SearchField"
    />
    <RaisedButton
      style={{ marginLeft: '22px' }}
      primary
      label="Search"
      onClick={() => search(document.getElementById('SearchField').value, callback)}
    />
    {filterBy ? <p style={{ display: 'inline-block', marginLeft: '22px' }}>Showing search results for: &quot;{filterBy}&quot;</p> : ''}
    {filterBy ? <RaisedButton style={{ marginLeft: '22px' }} primary label="Clear Search" onClick={() => clearSearch()} /> : ''}
  </div>
);


CreatePost.propTypes = {
  search: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
};

export default CreatePost;

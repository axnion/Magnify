import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function callback() {
  document.getElementById('CreatePostField').value = '';
}

const CreatePost = ({
  isWaiting,
  errorText,
  sendPostOnClick,
}) => (
  <div className="create-post">
    <TextField
      style={{ maxWidth: '800px' }}
      disabled={isWaiting}
      hintText="Say something witty!"
      floatingLabelText="Create a post"
      fullWidth
      multiLine
      rows={1}
      rowsMax={6}
      id="CreatePostField"
      errorText={errorText}
    />
    <RaisedButton
      primary
      label="Send"
      disabled={isWaiting}
      onClick={() => sendPostOnClick(document.getElementById('CreatePostField').value, callback)}
    />
  </div>
);


CreatePost.propTypes = {
  errorText: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  sendPostOnClick: PropTypes.func.isRequired,
};

CreatePost.defaultProps = {
  errorText: '',
};

export default CreatePost;

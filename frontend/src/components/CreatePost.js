import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

function callback() {
  document.getElementById('CreatePostField').value = '';
}

const CreatePost = ({
  isWaiting,
  error,
  snackbarError,
  snackbarSuccess,
  sendPostOnClick,
}) => (
  <div className="create-post">
    <TextField
      disabled={isWaiting}
      hintText="Say something witty!"
      floatingLabelText="Create a post"
      fullWidth
      multiLine
      rows={1}
      rowsMax={6}
      id="CreatePostField"
    />
    <button onClick={() => sendPostOnClick(document.getElementById('CreatePostField').value, callback)}>Send</button>
    <Snackbar
      open={snackbarError}
      message={error || ''}
      autoHideDuration={4000}
    />
    <Snackbar
      open={snackbarSuccess}
      message="Post saved"
      autoHideDuration={4000}
      bodyStyle={{ backgroundColor: '#21ba45' }}
      contentStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
  </div>
);


CreatePost.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  snackbarError: PropTypes.bool,
  snackbarSuccess: PropTypes.bool,
  sendPostOnClick: PropTypes.func.isRequired,
};

CreatePost.defaultProps = {
  error: null,
  snackbarError: false,
  snackbarSuccess: false,
};

export default CreatePost;

import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function callback() {
  document.getElementById('TitleField').value = '';
  document.getElementById('BodyField').value = '';
}

const CreateThread = ({
  error,
  isWaiting,
  errorText,
  snackbarError,
  snackbarSuccess,
  SubmitOnClick,
}) => (
  <div className="create-thread">
    <TextField
      style={{ width: '95%' }}
      disabled={isWaiting}
      floatingLabelText="Title"
      rows={1}
      id="TitleField"
    />
    <TextField
      style={{ width: '95%', marginBottom: '20px' }}
      disabled={isWaiting}
      floatingLabelText="Body"
      multiLine
      rows={8}
      rowsMax={16}
      id="BodyField"
    />
    <RaisedButton primary label="Create" onClick={() => SubmitOnClick({
      title: document.getElementById('TitleField').value,
      body: document.getElementById('BodyField').value,
    }, callback)} />
    <Snackbar
      open={snackbarError}
      message={error || errorText}
      autoHideDuration={4000}
    />
    <Snackbar
      open={snackbarSuccess}
      message="Thread successfully created!"
      autoHideDuration={4000}
      bodyStyle={{ backgroundColor: '#21ba45' }}
      contentStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
  </div>
);


CreateThread.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  snackbarError: PropTypes.bool,
  snackbarSuccess: PropTypes.bool,
  SubmitOnClick: PropTypes.func.isRequired,
};

CreateThread.defaultProps = {
  error: null,
  errorText: '',
  snackbarError: false,
  snackbarSuccess: false,
};

export default CreateThread;

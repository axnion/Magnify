import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function callback() {
  document.getElementById('TitleField').value = '';
  document.getElementById('BodyField').value = '';
}

const payload = {
  title: document.getElementById('TitleField'),
  body: document.getElementById('BodyField'),
};

const CreateThread = ({
  error,
  isWaiting,
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
    <RaisedButton primary label="Create" onClick={() => SubmitOnClick(payload, callback)} />
    <Snackbar
      open={snackbarError}
      message={error || ''}
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
  snackbarError: PropTypes.bool,
  snackbarSuccess: PropTypes.bool,
  SubmitOnClick: PropTypes.func.isRequired,
};

CreateThread.defaultProps = {
  error: null,
  snackbarError: false,
  snackbarSuccess: false,
};

export default CreateThread;

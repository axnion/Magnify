import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const actions = [
  <FlatButton
    label="Cancel"
    primary={true}
    onClick={console.log(this)}
  />,
  <FlatButton
    label="Submit"
    primary={true}
    onClick={console.log(this)}
  />,
];

const CreateThread = ({
  error,
  isWaiting,
  snackbarError,
  snackbarSuccess,
  SubmitOnClick,
}) => (
  <div className="create-thread">
  Yo
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


CreateThread.propTypes = {
  open: PropTypes.bool,
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  snackbarError: PropTypes.bool,
  snackbarSuccess: PropTypes.bool,
  sendPostOnClick: PropTypes.func.isRequired,
};

CreateThread.defaultProps = {
  open: false,
  error: null,
  snackbarError: false,
  snackbarSuccess: false,
};

export default CreateThread;

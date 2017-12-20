import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function callback() {
  document.getElementById('TitleField').value = '';
  document.getElementById('BodyField').value = '';
}

const CreateThread = ({
  isWaiting,
  SubmitOnClick,
  errorText,
}) => (
  <div className="create-thread">
    <TextField
      style={{ width: '95%' }}
      disabled={isWaiting}
      floatingLabelText="Title"
      rows={1}
      id="TitleField"
      errorText={errorText}
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
    <RaisedButton
      primary
      label="Create"
      onClick={() => SubmitOnClick({
      title: document.getElementById('TitleField').value,
      body: document.getElementById('BodyField').value,
    }, callback)}
    />
  </div>
);


CreateThread.propTypes = {
  isWaiting: PropTypes.bool.isRequired,
  SubmitOnClick: PropTypes.func.isRequired,
  errorText: PropTypes.string,
};

CreateThread.defaultProps = {
  errorText: '',
};

export default CreateThread;

import { connect } from 'react-redux';

import material from '../components/AddMaterial';
import uploadMaterial from '../actions/material';
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

const mapDispatchToProps = dispatch => ({
  sendForm: (data, productId, token) => {
    return dispatch(uploadMaterial(data, productId, token));
  },
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  isWaiting: state.material.isWaiting,
  error: state.material.error,
  token: state.auth.token,
});

const AddMaterialContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(material);

export default AddMaterialContainer;

import { connect } from 'react-redux';

import AddRepForm from '../components/AddRepForm';
import { createAccount } from '../actions/account';
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

const mapDispatchToProps = dispatch => ({
  sendForm: (data, token) => dispatch(createAccount(data, token)),
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  isWaiting: state.account.isWaiting,
  error: state.account.error,
  token: state.auth.token,
});

const AddRepFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddRepForm);

export default AddRepFormContainer;

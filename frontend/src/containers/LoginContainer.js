import { connect } from 'react-redux';

import Login from '../components/Login';
import { login } from '../actions/auth';
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

const mapDispatchToProps = dispatch => ({
  sendForm: data => dispatch(login(data)),
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  isWaiting: state.auth.isWaiting,
  error: state.auth.error,
  token: state.auth.token,
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;

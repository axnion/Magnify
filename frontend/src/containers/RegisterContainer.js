import { connect } from 'react-redux';

import Register from '../components/Register';
import { createConsumer } from '../actions/consumer';
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

const mapDispatchToProps = dispatch => ({
  sendForm: data => dispatch(createConsumer(data)),
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  isWaiting: state.consumer.isWaiting,
  error: state.consumer.error,
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterContainer;

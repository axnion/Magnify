import { connect } from 'react-redux';

import Register from '../components/Register';
import { createAccount } from '../actions/account';

const mapDispatchToProps = dispatch => ({
  sendForm: (data, token) => {
    dispatch(createAccount(data, token));
  },
});

const mapStateToProps = state => ({
  isWaiting: state.account.isWaiting,
  error: state.account.error,
  token: state.auth.token,
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterContainer;

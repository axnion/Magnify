import { connect } from 'react-redux';

import Login from '../components/Login.js';
import { login } from '../actions/auth.js';

const mapDispatchToProps = dispatch => ({
  sendForm: data => dispatch(login(data)),
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

import { connect } from 'react-redux';

import Login from '../components/Login.js';
import {mockTryLogin} from '../actions/auth.js';

const mapDispatchToProps = dispatch => {
  return {
    sendForm: data => {
      dispatch(mockTryLogin(data));
    }
  }
}

const mapStateToProps = state => {
  return {
    isWaiting: state.auth.isWaiting,
    error: state.auth.error,
    token: state.auth.token,
  }
}
  
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer;
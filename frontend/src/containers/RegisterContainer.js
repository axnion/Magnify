import { connect } from 'react-redux';

import Register from '../components/Register';
import { createConsumer } from '../actions/consumer';

const mapDispatchToProps = dispatch => ({
  sendForm: (data) => {
    dispatch(createConsumer(data));
  },
});

const mapStateToProps = state => ({
  isWaiting: state.account.isWaiting,
  error: state.account.error,
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterContainer;

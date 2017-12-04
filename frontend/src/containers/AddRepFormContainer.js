import { connect } from 'react-redux';

import AddRepForm from '../components/AddRepForm';
import { createAccount } from '../actions/account';

const mapDispatchToProps = dispatch => ({
  sendForm: (data, token) => dispatch(createAccount(data, token)),
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

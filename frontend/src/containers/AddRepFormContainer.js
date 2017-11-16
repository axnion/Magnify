import { connect } from 'react-redux';

import AddRepForm from '../components/AddRepForm.js';
import { createAccount } from '../actions/account.js';

const mapDispatchToProps = dispatch => {
  return {
    sendForm: (data, token) => {
      dispatch(createAccount(data, token));
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isWaiting: state.account.isWaiting,
    error: state.account.error,
    token: state.auth.token,
  };
}
  
const AddRepFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRepForm)

export default AddRepFormContainer;
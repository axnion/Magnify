import { connect } from 'react-redux';

import AddRepForm from '../components/AddRepForm.js';
import {mockCreateAccount} from '../actions/account.js';

const mapDispatchToProps = dispatch => {
  return {
    sendForm: data => {
      dispatch(mockCreateAccount(data));
    }
  }
}

const mapStateToProps = state => {
  return {
    isWaiting: state.account.isWaiting,
    error: state.account.error,
  }
}
  
const AddRepFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRepForm)

export default AddRepFormContainer;
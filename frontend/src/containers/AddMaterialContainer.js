import { connect } from 'react-redux';

import material from '../components/AddMaterial';
import uploadMaterial from '../actions/material';

const mapDispatchToProps = dispatch => ({
  sendForm: (data, token) => {
    dispatch(uploadMaterial(data, token));
  },
});

const mapStateToProps = state => ({
  isWaiting: state.material.isWaiting,
  error: state.material.error,
  token: state.auth.token,
});

const AddMaterialContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(material);

export default AddMaterialContainer;

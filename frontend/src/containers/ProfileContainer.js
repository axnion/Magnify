import { connect } from 'react-redux';

import AddRepForm from '../components/Profile';

const mapDispatchToProps = () => ({
});

const mapStateToProps = () => ({
});

const AddRepFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddRepForm);

export default AddRepFormContainer;

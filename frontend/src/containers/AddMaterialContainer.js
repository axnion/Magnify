import { connect } from 'react-redux';

import AddMaterial from '../components/AddMaterial';

const mapDispatchToProps = () => ({
});

const mapStateToProps = () => ({
});

const AddMaterialContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMaterial);

export default AddMaterialContainer;

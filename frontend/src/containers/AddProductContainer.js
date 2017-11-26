import { connect } from 'react-redux';

import AddProduct from '../components/AddProduct';

const mapDispatchToProps = () => ({
});

const mapStateToProps = () => ({
});

const AddProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);

export default AddProductContainer;

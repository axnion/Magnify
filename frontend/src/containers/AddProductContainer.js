import { connect } from 'react-redux';

import AddProduct from '../components/AddProduct';
import { createProduct } from '../actions/product';

const mapDispatchToProps = dispatch => ({
  sendForm: (data, token) => {
    dispatch(createProduct(data, token));
  },
});

const mapStateToProps = state => ({
  isWaiting: state.product.isWaiting,
  error: state.product.error,
  token: state.auth.token,
});

const AddProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);

export default AddProductContainer;

import { connect } from 'react-redux';

import ProductView from '../components/ProductView';
import { mockSelectProduct } from '../actions/product';

const mapDispatchToProps = dispatch => ({
  loadSelected: product => dispatch(mockSelectProduct()),
});

const mapStateToProps = state => ({
    error: state.productView.error,
    isWaiting: state.productView.isWaiting,
    product: state.productView.product,   
});

const ProductViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductView);

export default ProductViewContainer;
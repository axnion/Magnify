import { connect } from 'react-redux';

import ProductView from '../components/ProductView';

const mapDispatchToProps = () => ({
});

const mapStateToProps = state => ({
    materials: state.productView.materials,
    error: state.productView.error,
    isWaiting: state.productView.isWaiting,
    productName: state.productView.productName,
    productCompany: state.productView.productCompany
});

const ProductViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductView);

export default ProductViewContainer;
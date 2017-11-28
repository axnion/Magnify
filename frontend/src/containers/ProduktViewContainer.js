import { connect } from 'react-redux';

import ProductView from '../components/ProductView';

const mapDispatchToProps = () => ({
});

const mapStateToProps = () => ({
});

const ProductViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductView);

export default ProductViewContainer;
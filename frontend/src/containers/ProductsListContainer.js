import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { mockGetProducts } from '../actions/product';
import Products from '../components/Products';

class ProductsListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(mockGetProducts());
  }

  render() {
    const { products, error, isWaiting } = this.props;
    return (
      <div>
        <h1>Products</h1>
        {isWaiting && products.length === 0 && <h2>Loading...</h2>}
        {!isWaiting && products.length === 0 && <h2>Empty.</h2>}
        {!isWaiting && error && <h2>Error. {error} </h2>}
        {products.length > 0 &&
          <div style={{ opacity: isWaiting ? 0.5 : 1 }}>
            <Products products={products} />
          </div>}
      </div>
    );
  }
}

ProductsListContainer.propTypes = {
  products: PropTypes.array.isRequired, // eslint-disable-line
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ProductsListContainer.defaultProps = {
  error: null,
  isWaiting: false,
  products: [],
};


const mapStateToProps = state => ({
  products: state.product.products,
  error: state.product.error,
  isWaiting: state.product.isWaiting,
});

export default connect(
  mapStateToProps,
)(ProductsListContainer);

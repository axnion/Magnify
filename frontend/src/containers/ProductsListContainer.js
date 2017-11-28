import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { mockGetProducts, setFilterByCompany } from '../actions/product';
import { mockGetCompanies } from '../actions/company';
import Products from '../components/Products';
import Picker from '../components/Picker';

class ProductsListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
    dispatch(mockGetProducts());
    dispatch(mockGetCompanies());
  }

  getFilteredProducts() {
    const { products, filterByCompany } = this.props;
    return filterByCompany === 'All' ? products : products.filter(product => product.company === filterByCompany);
  }

  handleChange(companyToFilterBy) {
    this.props.dispatch(setFilterByCompany(companyToFilterBy));
  }

  render() {
    const { products, error, isWaiting, companies, filterByCompany } = this.props;
    return (
      <div>
        <Picker
          options={['All'].concat(companies)}
          value={filterByCompany}
          onChange={this.handleChange}
        />
        <h1>Products</h1>
        {isWaiting && products.length === 0 && <h2>Loading...</h2>}
        {!isWaiting && products.length === 0 && <h2>Empty.</h2>}
        {!isWaiting && error && <h2>Error. {error} </h2>}
        {products.length > 0 &&
          <div style={{ opacity: isWaiting ? 0.5 : 1 }}>
            <Products products={this.getFilteredProducts()} />
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
  companies: PropTypes.array.isRequired, // eslint-disable-line
  filterByCompany: PropTypes.string.isRequired,
};

ProductsListContainer.defaultProps = {
  error: null,
  isWaiting: false,
  products: [],
  companies: [],
  filterByCompany: '',
};


const mapStateToProps = state => ({
  products: state.product.products,
  error: state.product.error,
  isWaiting: state.product.isWaiting,
  filterByCompany: state.product.filterByCompany,
  companies: state.company.companies,
});

export default connect(
  mapStateToProps,
)(ProductsListContainer);

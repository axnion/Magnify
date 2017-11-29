import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { mockGetProducts, setFilterByCompany, getProducts } from '../actions/product';
import { mockGetCompanies, getCompanies } from '../actions/company';
import Products from '../components/Products';
import Picker from '../components/Picker';

class ProductsListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
    dispatch(getProducts());
    dispatch(getCompanies());
  }

  getFilteredProducts() {
    const { products, filterByCompanyName } = this.props;
    return filterByCompanyName !== 'All' ? products.filter(product => product.company._id === filterByCompanyName) : products;
  }

  handleChange(companyToFilterBy) {
    console.log(companyToFilterBy);
    this.props.dispatch(setFilterByCompany(companyToFilterBy));
  }

  render() {
    const { products, error, isWaiting, companies, filterByCompanyName } = this.props;
    return (
      <div>
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(companies)}
          value={filterByCompanyName}
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
  filterByCompanyName: PropTypes.string.isRequired,
};

ProductsListContainer.defaultProps = {
  error: null,
  isWaiting: false,
  products: [],
  companies: [],
  filterByCompanyName: 'All',
};

const mapStateToProps = state => ({
  products: state.product.products,
  error: state.product.error,
  isWaiting: state.product.isWaiting,
  filterByCompanyName: state.product.filterByCompanyName,
  companies: state.company.companies,
});

export default connect(
  mapStateToProps,
)(ProductsListContainer);

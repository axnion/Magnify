import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { setFilterByCompany, getProducts } from '../actions/product';
import { getCompanies } from '../actions/company';
import { getCategories } from '../actions/category';
import Products from '../components/Products';
import Picker from '../components/Picker';

class ProductsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
    this.state = {
      filterByCompanyName: 'All',
      filterByMainCategory: 'All',
      filterBySubCategory: 'All',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProducts());
    dispatch(getCompanies());
    dispatch(getCategories());
  }

  getFilteredProducts() {
    const { products,  } = this.props;
    const { filterByCompanyName } = this.state;
    return filterByCompanyName !== 'All' ? products.filter(product => product.company._id === filterByCompanyName) : products;
  }

  handleChange(companyToFilterBy) {
    //this.props.dispatch(setFilterByCompany(companyToFilterBy));
    this.setState({ filterByCompanyName: companyToFilterBy });
  }

  render() {
    const {
      products,
      error,
      isWaiting,
      companies,
      //filterByCompanyName,
      mainCategories,
      subCategories } = this.props;

    const { filterByCompanyName } = this.state;
    
    return (
      <div>
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(companies)}
          value={filterByCompanyName}
          //onChange={(event, value) => this.setState({ filterByCompanyName: value })}
          onChange={this.handleChange}
          title={'Filter by company'}
        />
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(mainCategories)}
          value={filterByCompanyName}
          onChange={this.handleChange}
          title={'Filter by main category'}
        />
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(subCategories)}
          value={filterByCompanyName}
          onChange={this.handleChange}
          title={'Filter by sub category'}
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
  //filterByCompanyName: PropTypes.string.isRequired,
  mainCategories: PropTypes.array.isRequired, // eslint-disable-line
  subCategories: PropTypes.array.subCategories, // eslint-disable-line
};

ProductsListContainer.defaultProps = {
  error: null,
  isWaiting: false,
  products: [],
  companies: [],
  //filterByCompanyName: 'All',
};

const mapStateToProps = state => ({
  products: state.product.products,
  error: state.product.error,
  isWaiting: state.product.isWaiting,
  //filterByCompanyName: state.product.filterByCompanyName,
  companies: state.company.companies,
  mainCategories: state.category.mainCategories,
  subCategories: state.category.subCategories,
});

export default connect(
  mapStateToProps,
)(ProductsListContainer);

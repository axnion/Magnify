import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { getProducts } from '../actions/product';
import { getCompanies } from '../actions/company';
import { getCategories } from '../actions/category';

import CategoryPickerContainer from './CategoryPickerContainer';
import Products from '../components/Products';
import Picker from '../components/Picker';

class ProductsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMain = this.handleChangeMain.bind(this);
    this.handleChangeSub = this.handleChangeSub.bind(this);
    this.handleSubComponentChange = this.handleSubComponentChange.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
    this.state = {
      selectedCompanyName: 'All',
      selectedMainCategory: 'All',
      selectedSubCategory: 'All',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProducts());
    dispatch(getCompanies());
    dispatch(getCategories());
  }

  getFilteredProducts(productsToShow) {
    const products = productsToShow;
    const { selectedCompanyName, selectedSubCategory, selectedMainCategory } = this.state;
    let productsFilteredByCompany;

    if (selectedCompanyName !== 'All') {
      productsFilteredByCompany = products.filter(product => product.company._id === selectedCompanyName);
    } else {
      productsFilteredByCompany = products;
    }

    let productsFilteredByMainCat;
    if (selectedMainCategory !== 'All') {
      productsFilteredByMainCat = productsFilteredByCompany.filter((product) => {
        if (product.category) {
          if (product.category._id === selectedMainCategory) return true;
          if (product.category.parent === selectedMainCategory) return true;
        }
        return false;
      });
    } else {
      productsFilteredByMainCat = productsFilteredByCompany;
    }

    let productsFilteredBySubCat;
    if (selectedSubCategory !== 'All') {
      productsFilteredBySubCat = productsFilteredByMainCat.filter(product => (product.category ? product.category._id === selectedSubCategory : false));
    } else {
      productsFilteredBySubCat = productsFilteredByMainCat;
    }

    return productsFilteredBySubCat;
  }

  handleSubComponentChange(stateChange) {
    this.setState(stateChange);
  }

  handleChange(event, index, value) {
    this.setState({ selectedCompanyName: value });
  }

  handleChangeMain(event, index, value) {
    this.setState({ selectedMainCategory: value });
  }

  handleChangeSub(event, index, value) {
    this.setState({ selectedSubCategory: value });
  }

  render() {
    const {
      products,
      error,
      isWaiting,
      companies,
      selectedProducts,
      shouldShowSelectedProducts,
      headerString,
    } = this.props;

    console.log(selectedProducts);
    const productsToShow = shouldShowSelectedProducts === true ? selectedProducts : products;
    const { selectedCompanyName } = this.state;

    return (
      <div>
        <h2>{headerString}</h2>
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(companies)}
          value={selectedCompanyName}
          onChange={this.handleChange}
          title="Filter by company"
        />
        <CategoryPickerContainer functionToRun={this.handleSubComponentChange} />
        {isWaiting && productsToShow.length === 0 && <h2>Loading...</h2>}
        {!isWaiting && productsToShow.length === 0 && <h2>Empty.</h2>}
        {!isWaiting && error && <h2>Error. {error} </h2>}
        {productsToShow.length > 0 &&
          <div style={{ opacity: isWaiting ? 0.5 : 1 }}>
            <Products products={this.getFilteredProducts(productsToShow)} />
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
  selectedProducts: PropTypes.bool.isRequired,
  shouldShowSelectedProducts: PropTypes.bool.isRequired,
  headerString: PropTypes.string,
};

ProductsListContainer.defaultProps = {
  error: null,
  headerString: 'Products',
};

const mapStateToProps = state => ({
  products: state.product.products,
  error: state.product.error,
  isWaiting: state.product.isWaiting,
  companies: state.company.companies,
  selectedProducts: state.account.selectedProducts,
});

export default connect(mapStateToProps)(ProductsListContainer);

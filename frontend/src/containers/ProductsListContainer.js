import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { getProducts } from '../actions/product';
import { getCompanies } from '../actions/company';
import { getCategories } from '../actions/category';

import CategoryPickerContainer from './CategoryPickerContainer';
import Products from '../components/Products';
import Picker from '../components/Picker';
import { addToFavorites } from '../actions/account';

class ProductsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMain = this.handleChangeMain.bind(this);
    this.handleChangeSub = this.handleChangeSub.bind(this);
    this.handleSubComponentChange = this.handleSubComponentChange.bind(this);
    this.getFilteredProducts = this.getFilteredProducts.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.state = {
      selectedCompanyName: 'All',
      selectedMainCategory: 'All',
      selectedSubCategory: 'All',
      clickedProduct: null,
    };
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getCompanies();
    this.props.getCategories();
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

  handleProductClick(productID) {
    this.setState({ clickedProduct: productID });
  }

  handleStarClick(product) {
    if (product.isFavorite) return;
    this.props.addToFavorites(product._id, this.props.token);
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

    // console.log(selectedProducts);
    let productsToShow = shouldShowSelectedProducts === true ? selectedProducts : products;
    if (!shouldShowSelectedProducts) {
      productsToShow = productsToShow.map((product) => {
        for (let i = 0; i < selectedProducts.length; i += 1) {
          if (product._id === selectedProducts[i]._id) {
            return {
              ...product,
              isFavorite: true,
            };
          }
        }

        return product;
      });
    }
    const { selectedCompanyName } = this.state;

    return (
      this.state.clickedProduct ?
        <Redirect to={`/ProductView/${this.state.clickedProduct}`} /> :
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
              <Products
                shouldShowSelectedProducts={shouldShowSelectedProducts}
                products={this.getFilteredProducts(productsToShow)}
                handleProductClick={this.handleProductClick}
                handleStarClick={this.handleStarClick}
              />
            </div>}
        </div>
    );
  }
}

ProductsListContainer.propTypes = {
  products: PropTypes.array.isRequired, // eslint-disable-line
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  companies: PropTypes.array.isRequired, // eslint-disable-line
  selectedProducts: PropTypes.bool.isRequired,
  shouldShowSelectedProducts: PropTypes.bool.isRequired,
  headerString: PropTypes.string,
  addToFavorites: PropTypes.func.isRequired,
  token: PropTypes.string,
  getProducts: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

ProductsListContainer.defaultProps = {
  error: null,
  token: null,
  headerString: 'Products',
};

const mapStateToProps = state => ({
  token: state.auth.token,
  products: state.product.products,
  error: state.product.error,
  isWaiting: state.product.isWaiting,
  companies: state.company.companies,
  selectedProducts: state.account.selectedProducts,
});

const mapDispatchToProps = dispatch => ({
  addToFavorites: (productId, token) => dispatch(addToFavorites(productId, token)),
  getProducts: () => dispatch(getProducts()),
  getCompanies: () => dispatch(getCompanies()),
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);

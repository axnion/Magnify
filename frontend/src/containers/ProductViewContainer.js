import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getAProduct } from '../actions/product';
import MaterialCard from '../components/MaterialCard';

class ProductView extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAProduct(this.props.match.params.id));
  }

  render() {
    const { auth, error, isWaiting } = this.props;
    let productHeadline = null;
    let materials = [];
    
    if (this.props.product) {

      materials = this.props.product.material;
      productHeadline =
            (<div>
              <h1>Product: {this.props.product.name}</h1>
              <h3>Company: {this.props.product.company.name}</h3>
              {
                
                (auth.role === null || auth.role === 'consumer' || this.props.product.company._id !== auth.company) ? undefined : <Link to={`/material/${this.props.product._id}`}><button>Upload material</button></Link>
              }
             </div>);
    } else { productHeadline = <h1>No product selected</h1>; }
    return (
      <div className="product">
        {productHeadline}
        <h3>Materials (downloadable)</h3>
        {isWaiting && materials.length === 0 && <h2>Loading...</h2>}
        {!isWaiting && materials.length === 0 && <h2>Empty.</h2>}
        {!isWaiting && error && <h2>Error. {error} </h2>}
        {materials.length > 0 &&
        <div style={{ opacity: isWaiting ? 0.5 : 1 }}>
          {materials.map((material, key) => 
            <MaterialCard key={key} material={material} showRateStars={(auth.role === 'consumer')} averageScore={3.5} numberOfRatings={150}/>
          )
          }
        </div>}
      </div>
    );
  }
}
ProductView.propTypes = {
  product: PropTypes.object,
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object
};

ProductView.defaultProps = {
  product: null,
  error: null,
  isWaiting: false,
};

const mapStateToProps = state => ({
  error: state.productView.error,
  isWaiting: state.productView.isWaiting,
  product: state.productView.product,
  auth: state.auth,
});

const ProductViewContainer = connect(
  mapStateToProps,
)(ProductView);

export default ProductViewContainer;

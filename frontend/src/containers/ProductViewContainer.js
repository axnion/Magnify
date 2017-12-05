import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import { getAProduct } from '../actions/product';
import { mockUploadAnnotation } from '../actions/annotation';
import MaterialCard from '../components/MaterialCard';

class ProductView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { snackbarError: false, snackbarSuccess: false };

    this.saveAnnotation = this.saveAnnotation.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAProduct(this.props.match.params.id));
  }

  saveAnnotation(annotation, materialId) {
    const { dispatch } = this.props;

    if (annotation !== '') {
      dispatch(mockUploadAnnotation(annotation, materialId, this.props.auth.token))
        .then(() => {
          if (this.props.error) {
            this.setState({ snackbarError: true });
          } else {
            this.setState({ snackbarSuccess: true });
          }
        });
    }
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
            <MaterialCard key={key} material={material} showRateStars={(auth.role === 'consumer')} averageScore={3.5} numberOfRatings={150} annotation="test" saveAnnotation={this.saveAnnotation} />)
          }
        </div>}
        <Snackbar
          open={this.state.snackbarError}
          message={this.props.error || ''}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={this.state.snackbarSuccess}
          message={'Notes saved'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: '#21ba45' }}
          contentStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
      </div>
    );
  }
}
ProductView.propTypes = {
  product: PropTypes.object,
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  waitingUploadAnnotation: PropTypes.bool,
  errorUploadAnnotation: PropTypes.string,
};

ProductView.defaultProps = {
  product: null,
  error: null,
  isWaiting: false,
  snackbarError: false,
  snackbarSuccess: false,
  waitingUploadAnnotation: false,
  errorUploadAnnotation: null,
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

import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import RaisedButton from 'material-ui/RaisedButton';
import { getAProduct } from '../actions/product';
import { uploadRating } from '../actions/product';
import { uploadAnnotation, getAnnotations } from '../actions/annotation';
import MaterialCard from '../components/MaterialCard';

class ProductView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { snackbarError: false, snackbarSuccess: false };

    this.saveAnnotation = this.saveAnnotation.bind(this);
    this.saveRating = this.saveRating.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAProduct(this.props.match.params.id));
    dispatch(getAnnotations(this.props.auth.token, this.props.match.params.id));
  }

  saveAnnotation(annotation, materialId) {
    const { dispatch } = this.props;

    if (annotation !== '') {
      dispatch(uploadAnnotation(annotation, materialId, this.props.auth.token))
        .then(() => {
          if (this.props.errorUploadAnnotation) {
            this.setState({ snackbarError: true });
          } else {
            this.setState({ snackbarSuccess: true });
          }
        });
    }
  }

  saveRating(rating, materialId) {
    const { dispatch } = this.props;

    console.log(rating, materialId);
    /*dispatch(uploadRating(rating, materialId, this.props.auth.token))
      .then(() => {
        if (this.props.errorUploadRating) {
          this.setState({ snackbarError: true });
        } else {
          this.setState({ snackbarSuccess: true });
        }
      });*/
  }

  render() {
    const { auth, error, isWaiting } = this.props;
    let productHeadline = null;
    let materials = [];

    console.log(this.props.annotations);

    if (this.props.product) {
      materials = this.props.product.material;
      productHeadline =
            (<div>
              <h1>Product: {this.props.product.name}</h1>
              <h3>Company: {this.props.product.company.name}</h3>
              {
                (auth.role === null || auth.role === 'consumer' || this.props.product.company._id !== auth.company) ? undefined : <Link to={`/material/${this.props.product._id}`}><RaisedButton primary label="Upload Material" /></Link>
              }
            </div>);
    } else { productHeadline = <h1>No product selected</h1>; }
    return (
      <div className="product">
        {productHeadline}
        {isWaiting && materials.length === 0 && <h2>Loading...</h2>}
        {!isWaiting && materials.length === 0 && <h2>Empty.</h2>}
        {!isWaiting && error && <h2>Error. {error} </h2>}
        {materials.length > 0 &&
        <div style={{ opacity: isWaiting ? 0.5 : 1, marginTop: '25px' }} >
          {materials.map((material, key) => <MaterialCard key={key} material={material} saveRating={this.saveRating} showRateStars={(auth.role === 'consumer')} saveAnnotation={this.saveAnnotation} annotation={this.props.annotations.find(a => a.material._id === material._id)} />)}
        </div>}
        <Snackbar
          open={this.state.snackbarError}
          message={this.props.errorUploadAnnotation || ''}
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
  product: PropTypes.object, // eslint-disable-line
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // eslint-disable-line
  waitingUploadAnnotation: PropTypes.bool,
  errorUploadAnnotation: PropTypes.string,
  annotations: PropTypes.array, // eslint-disable-line
};

ProductView.defaultProps = {
  product: null,
  error: null,
  isWaiting: false,
  snackbarError: false, // eslint-disable-line
  snackbarSuccess: false, // eslint-disable-line
  waitingUploadAnnotation: false,
  errorUploadAnnotation: null,
  annotations: [],
};

const mapStateToProps = state => ({
  error: state.productView.error,
  isWaiting: state.productView.isWaiting,
  product: state.productView.product,
  auth: state.auth,
  waitingUploadAnnotation: state.productView.waitingUploadAnnotation,
  errorUploadAnnotation: state.productView.errorUploadAnnotation,
  annotations: state.productView.annotations,
});

const ProductViewContainer = connect(
  mapStateToProps,
)(ProductView);

export default ProductViewContainer;

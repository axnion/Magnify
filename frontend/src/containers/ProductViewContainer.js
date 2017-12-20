import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductView from '../components/ProductView';
import { getAProduct } from '../actions/product';
import postRating from '../actions/rating';
import { uploadAnnotation, getAnnotations } from '../actions/annotation';
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

class ProductViewContainer extends Component {
  constructor(props) {
    super(props);

    this.saveAnnotation = this.saveAnnotation.bind(this);
    this.saveRating = this.saveRating.bind(this);
  }

  componentWillMount() {
    this.props.getAProduct(this.props.match.params.id, this.props.auth.token);
    this.props.getAnnotations(this.props.auth.token, this.props.match.params.id);
  }

  saveAnnotation(annotation, materialId) {
    this.props.uploadAnnotation(annotation, materialId, this.props.auth.token)
      .then(() => {
        if (this.props.errorUploadAnnotation) {
          this.props.showError(this.props.errorUploadAnnotation);
        } else {
          this.props.showSuccess('Notes saved');
          this.props.getAnnotations(this.props.auth.token, this.props.match.params.id);
        }
      });
  }

  saveRating(rating, materialId) {
    this.props.postRating(rating, materialId, this.props.auth.token)
      .then(() => {
        if (this.props.errorPostRating) {
          this.props.showError(this.props.errorPostRating);
        } else {
          this.props.showSuccess('Material rated');
        }
        this.props.getAProduct(this.props.match.params.id, this.props.auth.token);
      });
  }

  render() {
    return (
      <ProductView
        saveRating={this.saveRating}
        saveAnnotation={this.saveAnnotation}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAProduct: (id, token) => dispatch(getAProduct(id, token)),
  getAnnotations: (token, id) => dispatch(getAnnotations(token, id)),
  uploadAnnotation: (annotation, materialId, token) => dispatch(uploadAnnotation(annotation, materialId, token)),
  postRating: (rating, materialId, token) => dispatch(postRating(rating, materialId, token)),
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  error: state.product.error,
  isWaiting: state.product.isWaiting,
  product: state.product.currentProduct,
  auth: state.auth,
  waitingUploadAnnotation: state.product.waitingUploadAnnotation,
  errorUploadAnnotation: state.product.errorUploadAnnotation,
  annotations: state.product.annotations,
  errorPostRating: state.product.errorPostRating,
  waitingPostRating: state.product.waitingPostRating,
});

ProductViewContainer.propTypes = ({
  getAnnotations: PropTypes.func.isRequired,
  getAProduct: PropTypes.func.isRequired,
  postRating: PropTypes.func.isRequired,
  uploadAnnotation: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  errorUploadAnnotation: PropTypes.string,
  errorPostRating: PropTypes.string,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
});

ProductViewContainer.defaultProps = ({
  errorUploadAnnotation: null,
  errorPostRating: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductViewContainer);

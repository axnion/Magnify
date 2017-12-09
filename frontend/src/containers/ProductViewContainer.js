import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductView from '../components/ProductView';
import { getAProduct } from '../actions/product';
import { postRating } from '../actions/rating';
import { uploadAnnotation, getAnnotations } from '../actions/annotation';

class ProductViewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarError: false,
      snackbarSuccess: false,
      snackbarPostRatingError: false,
      snackbarPostRatingSuccess: false,
    };

    this.saveAnnotation = this.saveAnnotation.bind(this);
    this.saveRating = this.saveRating.bind(this);
  }

  componentDidMount() {
    this.props.getAProduct(this.props.match.params.id, this.props.auth.token);
    this.props.getAnnotations(this.props.auth.token, this.props.match.params.id);
  }

  saveAnnotation(annotation, materialId) {
    if (annotation !== '') {
      this.props.uploadAnnotation(annotation, materialId, this.props.auth.token)
        .then(() => {
          if (this.props.errorUploadAnnotation) {
            this.setState({ snackbarError: true });
          } else {
            this.setState({ snackbarSuccess: true });
            this.props.getAnnotations(this.props.auth.token, this.props.match.params.id);
          }
        });
    }
  }

  saveRating(rating, materialId) {
    this.props.postRating(rating, materialId, this.props.auth.token)
      .then(() => {
        if (this.props.errorPostRating) {
          this.setState({ snackbarPostRatingError: true });
        } else {
          this.setState({ snackbarPostRatingSuccess: true });
        }
        this.props.getAProduct(this.props.match.params.id, this.props.auth.token);
      });
  }

  render() {
    return (
      <ProductView
        saveRating={this.saveRating}
        saveAnnotation={this.saveAnnotation}
        {...this.state}
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
});

ProductViewContainer.defaultProps = ({
  errorUploadAnnotation: null,
  errorPostRating: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductViewContainer);

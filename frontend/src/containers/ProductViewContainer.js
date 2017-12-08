import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  error: state.productView.error,
  isWaiting: state.productView.isWaiting,
  product: state.productView.product,
  auth: state.auth,
  waitingUploadAnnotation: state.productView.waitingUploadAnnotation,
  errorUploadAnnotation: state.productView.errorUploadAnnotation,
  annotations: state.productView.annotations,
  errorPostRating: state.productView.errorPostRating,
  waitingPostRating: state.productView.waitingPostRating,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductViewContainer);

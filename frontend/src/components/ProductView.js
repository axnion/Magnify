import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import RaisedButton from 'material-ui/RaisedButton';
import MaterialCard from '../components/MaterialCard';

const ProductView = ({
  isWaiting,
  error,
  auth,
  annotations,
  errorPostRating,
  errorUploadAnnotation,
  product,
  product: {
    materials,
  },
  snackbarError,
  snackbarSuccess,
  snackbarPostRatingError,
  snackbarPostRatingSuccess,
  saveRating,
  saveAnnotation,
  handleRequestClose,
}) => (
  <div className="product">
    {product ?
      <div>
        <h1>Product: {product.name}</h1>
        <h3>Company: {product.company.name}</h3>
        {
          (isWaiting || auth.role === null || auth.role === 'consumer' || product.company._id !== auth.company) ?
          undefined :
          <Link to={`/material/${product._id}`}>
            <RaisedButton primary label="Upload Material" />
          </Link>
        }
      </div> :
      <h1>No product selected</h1>
    }
    {isWaiting && materials.length === 0 && <h2>Loading...</h2>}
    {!isWaiting && materials.length === 0 && <h2>Empty.</h2>}
    {!isWaiting && error && <h2>Error. {error} </h2>}
    {materials.length > 0 &&
      <div style={{ opacity: isWaiting ? 0.5 : 1, marginTop: '25px' }} >
        {materials.map(material => (
          <MaterialCard
            key={material._id}
            material={material}
            saveRating={saveRating}
            showRateStars={(auth.role === 'consumer')}
            saveAnnotation={saveAnnotation}
            annotation={annotations.find(a => a.material === material._id)}
          />
        ))}
      </div>
    }
    <Snackbar
      open={snackbarError}
      message={errorUploadAnnotation || ''}
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
    />
    <Snackbar
      open={snackbarSuccess}
      message="Notes saved"
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
      bodyStyle={{ backgroundColor: '#21ba45' }}
      contentStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
    <Snackbar
      open={snackbarPostRatingError}
      message={errorPostRating || ''}
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
    />
    <Snackbar
      open={snackbarPostRatingSuccess}
      message="Material was rated"
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
      bodyStyle={{ backgroundColor: '#21ba45' }}
      contentStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
  </div>
);

ProductView.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  auth: PropTypes.shape({
    role: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
  errorUploadAnnotation: PropTypes.string,
  errorPostRating: PropTypes.string,
  annotations: PropTypes.arrayOf(PropTypes.any),
  snackbarError: PropTypes.bool,
  snackbarSuccess: PropTypes.bool,
  snackbarPostRatingError: PropTypes.bool,
  snackbarPostRatingSuccess: PropTypes.bool,
  saveRating: PropTypes.func.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

ProductView.defaultProps = {
  product: null,
  error: null,
  isWaiting: false,
  snackbarError: false,
  snackbarSuccess: false,
  snackbarPostRatingError: false,
  snackbarPostRatingSuccess: false,
  errorUploadAnnotation: null,
  errorPostRating: null,
  annotations: [],
};

export default ProductView;

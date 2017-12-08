import React, { Component } from 'react';
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
          (auth.role === null || auth.role === 'consumer' || product.company._id !== auth.company) ?
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
  product: PropTypes.object, // eslint-disable-line
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // eslint-disable-line
  waitingUploadAnnotation: PropTypes.bool, // eslint-disable-line
  errorUploadAnnotation: PropTypes.string,
  waitingPostRating: PropTypes.bool, // eslint-disable-line
  errorPostRating: PropTypes.string,
  annotations: PropTypes.array, // eslint-disable-line
};

ProductView.defaultProps = {
  product: null,
  error: null,
  isWaiting: false,
  snackbarError: false, // eslint-disable-line
  snackbarSuccess: false, // eslint-disable-line
  snackbarPostRatingError: false, // eslint-disable-line
  snackbarPostRatingSuccess: false, // eslint-disable-line
  waitingUploadAnnotation: false,
  errorUploadAnnotation: null,
  errorPostRating: null,
  waitingPostRating: null,
  annotations: [],
};

export default ProductView;

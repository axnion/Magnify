import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import MaterialCard from '../components/MaterialCard';

const ProductView = ({
  isWaiting,
  error,
  auth,
  annotations,
  product,
  product: { materials },
  saveRating,
  saveAnnotation,
}) => (
  <div className="product">
    {product ? (
      <div>
        <h1>Product: {product.name}</h1>
        <h3>Company: {product.company.name}</h3>
        {isWaiting ||
        auth.role === null ||
        auth.role === 'consumer' ||
        product.company._id !== auth.company ? (
          <Link to={`/createThread/${product._id}`}>
            <RaisedButton primary label="Create forum thread" />
          </Link>
        ) : (
          <Link to={`/material/${product._id}`}>
            <RaisedButton primary label="Upload Material" />
          </Link>
        )}
      </div>
    ) : (
      <h1>No product selected</h1>
    )}
    {isWaiting && <h2>Loading...</h2>}
    {!isWaiting && materials.length === 0 && <h2>Empty.</h2>}
    {!isWaiting && error && <h2>Error. {error} </h2>}
    {!isWaiting &&
      materials.length > 0 && (
        <div style={{ opacity: isWaiting ? 0.5 : 1, marginTop: '25px' }}>
          {materials.map(material => (
            <MaterialCard
              key={material._id}
              material={material}
              saveRating={saveRating}
              showRateStars={auth.role === 'consumer'}
              saveAnnotation={saveAnnotation}
              annotation={annotations.find(a => a.material === material._id)}
            />
          ))}
        </div>
      )}
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
  annotations: PropTypes.arrayOf(PropTypes.any),
  saveRating: PropTypes.func.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
};

ProductView.defaultProps = {
  product: null,
  error: null,
  isWaiting: false,
  annotations: [],
};

export default ProductView;

import React from 'react';
import PropTypes from 'prop-types';

const Products = ({ products }) => (
  <ul>
    {products.map((product, key) =>
      <li key={key}>Name: {product.name}, Company: {product.company}, Category: {product.category} </li>)}
  </ul>
);

Products.propTypes = {
  products: PropTypes.array.isRequired, //eslint-disable-line
};

export default Products;

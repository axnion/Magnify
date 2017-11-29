import React from 'react';
import PropTypes from 'prop-types';

const Products = ({ products }) => (
  <ul>
    {products.map(product =>
      <li key={product._id}>Name: {product.name}, Company: {product.company.name}, Category: {product.category.name} </li>)}
  </ul>
);

Products.propTypes = {
  products: PropTypes.array.isRequired, //eslint-disable-line
};

export default Products;

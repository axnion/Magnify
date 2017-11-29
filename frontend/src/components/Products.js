import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Products = ({ products }) => (
  <ul>
    {products.map((product, key) =>
      <Link key={key} to={`/ProductView/${product.id}`}><li>Name: {product.name}, Company: {product.company}, Category: {product.category} </li></Link>)}
  </ul>
);

Products.propTypes = {
  products: PropTypes.array.isRequired, //eslint-disable-line
};

export default Products;

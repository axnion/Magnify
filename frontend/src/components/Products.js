import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Products = ({ products }) => (
  <ul>
    {products.map(product =>   
      <Link key={product._id} to={`/ProductView/${product._id}`}>
        {console.log(product)} 
        <li>Name: {product.name}, Company: {product.company.name}{product.category ? `, Category: ${product.category.name}` : ''}</li>
      </Link>    
    )}
  </ul>
);

Products.propTypes = {
  products: PropTypes.array.isRequired, //eslint-disable-line
};

export default Products;

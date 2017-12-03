import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';

const Products = ({ products }) => (
  <List>
    {products.map((product, key) =>
      (<Link key={key} to={`/ProductView/${product._id}`}>
        <ListItem primaryText={product.name} secondaryText={`${product.company.name} (${product.category.name})`} />
      </Link>),
    )}
  </List>
);

Products.propTypes = {
  products: PropTypes.array.isRequired, //eslint-disable-line
};

export default Products;

import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import BorderStar from 'material-ui/svg-icons/toggle/star-border';

const Products = ({ products, handleProductClick }) => (
  <List>
    {
      products.map(product =>
        (
          <ListItem
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            rightIconButton={
              <IconButton onClick={() => console.log('hello')}>
                <BorderStar />
              </IconButton>
            }
          >
            Name: {product.name}, Company: {product.company.name}{product.category ? `, Category: ${product.category.name}` : ''}
          </ListItem>
        ))}
  </List>
);

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleProductClick: PropTypes.func.isRequired,
};

export default Products;

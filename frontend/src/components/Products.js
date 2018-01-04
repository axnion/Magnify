import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FullStar from 'material-ui/svg-icons/toggle/star';
import BorderStar from 'material-ui/svg-icons/toggle/star-border';
import { yellow600 } from 'material-ui/styles/colors';

const Products = ({
  products,
  handleProductClick,
  handleStarClick,
  shouldShowSelectedProducts,
}) => (
  <List>
    {
      products.map(product =>
        (
          <ListItem
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            rightIconButton={
              !shouldShowSelectedProducts ?
                <IconButton onClick={() => handleStarClick(product)}>
                  {
                    product.isFavorite ? <FullStar color={yellow600} /> : <BorderStar />
                  }
                </IconButton> : undefined
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
  handleStarClick: PropTypes.func.isRequired,
  shouldShowSelectedProducts: PropTypes.bool.isRequired,
};

export default Products;

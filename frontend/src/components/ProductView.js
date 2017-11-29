import React from 'react';
import PropTypes from 'prop-types';
import Materials from './Materials';

class ProductView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { materials, error, isWaiting } = this.props;
    return (
      <div className="product">
        <h1>Product: {this.props.productName}</h1>
        <h3>Company: {this.props.productCompany}</h3>
        <h3>Materials (downloadable)</h3>
        {isWaiting && materials.length === 0 && <h2>Loading...</h2>}
        {!isWaiting && materials.length === 0 && <h2>Empty.</h2>}
        {!isWaiting && error && <h2>Error. {error} </h2>}
        {materials.length > 0 &&
        <div style={{ opacity: isWaiting ? 0.5 : 1 }}>
          <Materials materials={this.materials} />
        </div>}
      </div>
    );
  }
}

ProductView.propTypes = {
  productName: PropTypes.string,
  productCompany: PropTypes.string,
  materials: PropTypes.array,
  error: PropTypes.string,
  isWaiting: PropTypes.string,
};

ProductView.defaultProps = {
  productName: null,
  productCompany: null,
  materials: [],
  error: null,
  isWaiting: null,
};

export default ProductView;

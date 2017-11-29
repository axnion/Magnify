import React from 'react';
import PropTypes from 'prop-types';
import Materials from './Materials';

class ProductView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.loadSelected = props.loadSelected;
        this.loadSelected();
    }

    render() {
        const { error, isWaiting} = this.props;
        let productHeadline = null;
        let materials = [];
        if (this.props.product) { 
            materials = this.props.product.material;
            productHeadline =
        <div>
            <h1>Product: {this.props.product.name}</h1>
            <h3>Company: {this.props.product.company}</h3>
        </div>}
        else
            productHeadline = <h1>No product selected</h1>
                
        return (
            <div className="product">
                {productHeadline}
                <h3>Materials (downloadable)</h3>
                {isWaiting && materials.length === 0 && <h2>Loading...</h2>}
                {!isWaiting && materials.length === 0 && <h2>Empty.</h2>}
                {!isWaiting && error && <h2>Error. {error} </h2>}
                {materials.length > 0 &&
                    <div style={{ opacity: isWaiting ? 0.5 : 1 }}>
                        <Materials materials={materials} />
                    </div>}
            </div>
        )
    }
}

ProductView.propTypes = {
    product: PropTypes.object,
    error: PropTypes.string,
    isWaiting: PropTypes.bool,
    loadSelected: PropTypes.func.isRequired, 
}

ProductView.defaultProps = {
    product: null,
    error: null,
    isWaiting: false 
}

export default ProductView;
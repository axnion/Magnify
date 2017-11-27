import React from 'react';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  render() {
    return (
      <div className="AddProduct">
        <h1>Add Product here</h1>
      </div>
    );
  }
}

export default AddProduct;

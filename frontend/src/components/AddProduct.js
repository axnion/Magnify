import React from 'react';
import PropTypes from 'prop-types';

import CategoryPickerContainer from '../containers/CategoryPickerContainer';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', name: '', category: '', hasSubmitted: false };
    this.sendForm = props.sendForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubComponentChange = this.handleSubComponentChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubComponentChange(change) {
    const update = { category: '' };
    if (change.selectedSubCategory !== 'All' && change.selectedSubCategory) {
      update.category = change.selectedSubCategory;
    } else if (change.selectedMainCategory !== 'All' && change.selectedMainCategory) {
      update.category = change.selectedMainCategory;
    }

    this.setState(update);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      // title: this.state.title,
      // description: this.state.description,
      name: this.state.name,
      category: this.state.category,
    };

    this.sendForm(data, this.props.token);
    this.setState({ hasSubmitted: true });
    this.setState({ title: '', description: '', name: '', category: '' });
  }

  printSubmitMessage() {
    if (this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Could not add new product. {this.props.error} </p>
      );
    } else if (!this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Product added!</p>
      );
    }

    return undefined;
  }

  render() {
    return (
      <div className="AddProduct">
        <h1>Add Product here</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={this.props.isWaiting}>
            {/* <div>
              <label htmlFor="title">
                Title:
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                Description:
                <input
                  id="description"
                  name="description"
                  type="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
            </div> */}
            <div>
              <label htmlFor="name">
                Product name:
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <CategoryPickerContainer functionToRun={this.handleSubComponentChange} />
            <input type="submit" value="Add" />
            {this.printSubmitMessage()}
          </fieldset>
        </form>
      </div>
    );
  }
}

AddProduct.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
};

AddProduct.defaultProps = {
  error: null,
  isWaiting: false,
  token: null,
};

export default AddProduct;

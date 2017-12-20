import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import CategoryPickerContainer from '../containers/CategoryPickerContainer';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', category: '', errorText: '' };
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

    if (this.state.name !== '') {
      const data = {
        name: this.state.name,
        category: this.state.category,
      };

      this.sendForm(data, this.props.token).then(() => {
        if (this.props.error) {
          this.props.showError(this.props.error);
        } else {
          this.props.showSuccess('Product added');
        }
      });
      this.setState({ name: '', category: '', errorText: '' });
    } else {
      this.setState({ errorText: 'Product needs a name' });
    }
  }

  render() {
    return (
      <div className="AddProduct">
        <h1>Add Product</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText="Product name"
            value={this.state.name}
            onChange={(event, value) => this.setState({ name: value })}
            disabled={this.props.isWaiting}
            errorText={this.state.errorText}
          /><br />
          <CategoryPickerContainer functionToRun={this.handleSubComponentChange} /> <br />
          <RaisedButton onClick={this.handleSubmit} label="Add" primary />
        </form>
        <Snackbar
          open={this.state.snackbarError}
          message={this.props.error || ''}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

AddProduct.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
};

AddProduct.defaultProps = {
  error: null,
  isWaiting: false,
  token: null,
};

export default AddProduct;

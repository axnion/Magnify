import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import CategoryPickerContainer from '../containers/CategoryPickerContainer';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', name: '', category: '', hasSubmitted: false, snackbarError: false, snackbarSuccess: false };
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

    this.sendForm(data, this.props.token).then(() => {
      if (this.props.error) {
        this.setState({ snackbarError: true });
      } else {
        this.setState({ snackbarSuccess: true });
      }
    });
    this.setState({ hasSubmitted: true });
    this.setState({ title: '', description: '', name: '', category: '' });
  }

  render() {
    return (
      <div className="AddProduct">
        <h1>Add Product</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText="Product name"
            value={this.state.name}
            onChange={(event, value) => this.setState({ name: value, error: false })}
            disabled={this.props.isWaiting}
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
        <Snackbar
          open={this.state.snackbarSuccess}
          message={'Product added!'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: '#21ba45' }}
          contentStyle={{ color: '#fff', fontWeight: 'bold' }}
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
};

AddProduct.defaultProps = {
  error: null,
  snackbarError: false,
  snackbarSuccess: false,
  isWaiting: false,
  token: null,
};

export default AddProduct;

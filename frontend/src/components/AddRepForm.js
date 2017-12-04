import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class AddRepForm extends React.Component {
  constructor(props) {
    super(props);
    // hasSubmitted is used to make sure messages wont show before the first submition and is not the same as isWaiting
    this.state = { username: '', password: '', hasSubmitted: false, snackbarError: false, snackbarSuccess: false };

    this.sendForm = props.sendForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      role: 'companyRep',
    };

    this.sendForm(data, this.props.token).then(() => {
      if (this.props.error) {
        this.setState({ snackbarError: true });
      } else {
        this.setState({ snackbarSuccess: true });
      }
    });
    this.setState({ hasSubmitted: true });
    this.setState({ username: '', password: '' });
  }

  printSubmitMessage() {
    if (this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Could not add new representative. {this.props.error} </p>
      );
    } else if (!this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>representative added!</p>
      );
    }

    return undefined;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add representative to company</h1>
        <TextField
          hintText="Username"
          value={this.state.username}
          onChange={(event, value) => this.setState({ username: value, error: false })}
          disabled={this.props.isWaiting}
        /><br />
        <TextField
          hintText="Password"
          type="password"
          value={this.state.password}
          onChange={(event, value) => this.setState({ password: value, error: false })}
          disabled={this.props.isWaiting}
        /><br />
        <RaisedButton onClick={this.handleSubmit} label="Add" primary />
        <Snackbar
          open={this.state.snackbarError}
          message={this.props.error || ''}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={this.state.snackbarSuccess}
          message={'Representative added!'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: '#21ba45' }}
          contentStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
      </form>
    );
  }
}

AddRepForm.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
};

AddRepForm.defaultProps = {
  error: null,
  snackbarError: false,
  snackbarSuccess: false,
  isWaiting: false,
  token: null,
};

export default AddRepForm;

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class CreateAccount extends React.Component {
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
    };

    this.sendForm(data).then(() => {
      if (this.props.error) {
        this.setState({ snackbarError: true });
      } else {
        this.setState({ snackbarSuccess: true });
        this.props.history.push('/login');
      }
    });
    this.setState({ hasSubmitted: true });
    this.setState({ username: '', password: '' });
  }

  render() {
    return (
      <div>
        <h1>Create new account</h1>
        <form onSubmit={this.handleSubmit}>
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
          <RaisedButton onClick={this.handleSubmit} label="Create" primary />
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

CreateAccount.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  sendForm: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

CreateAccount.defaultProps = {
  snackbarSuccess: false,
  error: null,
  isWaiting: false,
};

export default CreateAccount;

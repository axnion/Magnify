import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddRepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameErrorText: '',
      passwordErrorText: '',
    };

    this.sendForm = props.sendForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.username !== '' && this.state.password !== '') {
      const data = {
        username: this.state.username,
        password: this.state.password,
        role: 'companyRep',
      };

      this.sendForm(data, this.props.token).then(() => {
        if (this.props.error) {
          this.props.showError(this.props.error);
        } else {
          this.props.showSuccess('Representative added');
        }
      });

      this.setState({
        username: '',
        password: '',
        usernameErrorText: '',
        passwordErrorText: '',
      });
    } else {
      if (this.state.username === '') {
        this.setState({
          usernameErrorText: 'Username is required',
        });
      } else {
        this.setState({
          usernameErrorText: '',
        });
      }
      if (this.state.password === '') {
        this.setState({
          passwordErrorText: 'Password is required',
        });
      } else {
        this.setState({
          passwordErrorText: '',
        });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add representative to company</h1>
        <TextField
          hintText="Username"
          value={this.state.username}
          onChange={(event, value) => this.setState({ username: value })}
          disabled={this.props.isWaiting}
          errorText={this.state.usernameErrorText}
        /><br />
        <TextField
          hintText="Password"
          type="password"
          value={this.state.password}
          onChange={(event, value) => this.setState({ password: value })}
          disabled={this.props.isWaiting}
          errorText={this.state.passwordErrorText}
        /><br />
        <RaisedButton onClick={this.handleSubmit} label="Add" primary />
      </form>
    );
  }
}

AddRepForm.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
};

AddRepForm.defaultProps = {
  error: null,
  isWaiting: false,
  token: null,
};

export default AddRepForm;

import React from 'react';
import PropTypes from 'prop-types';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    // hasSubmitted is used to make sure messages wont show before the first submition and is not the same as isWaiting
    this.state = { username: '', password: '', hasSubmitted: false };

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
      admin: false,
    };

    this.sendForm(data, this.props.token);
    this.setState({ hasSubmitted: true });
    this.setState({ username: '', password: '' });
  }

  printSubmitMessage() {
    if (this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Could not create account. {this.props.error} </p>
      );
    } else if (!this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Account created!</p>
      );
    }

    return undefined;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Create new account</h1>
        <fieldset disabled={this.props.isWaiting}>
          <div>
            <label htmlFor="username">
              Username:
              <input
                id="username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="submit" value="Create" />
          {this.printSubmitMessage()}
        </fieldset>
      </form>
    );
  }
}

CreateAccount.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
};

CreateAccount.defaultProps = {
  error: null,
  isWaiting: false,
  token: null,
};

export default CreateAccount;

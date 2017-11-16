import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
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
    };

    this.setState({ hasSubmitted: true });
    this.setState({ name: '', password: '' });

    this.props.sendForm(data).then(() => {
      if (!this.props.error) {
        this.props.history.push('/addRep');
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        {
          this.props.location.message ?
            <h3>
              { this.props.location.message }
            </h3> : undefined
        }
        <fieldset disabled={this.props.isWaiting}>
          <div>
            <label htmlFor="username">
              Username:
              <input
                name="username"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="submit" value="Login" />
          { this.props.error && !this.props.isWaiting && this.state.hasSubmitted ?
            <p> Could not log in. {this.props.error} </p> : undefined }
        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  sendForm: PropTypes.func.isRequired,
  location: PropTypes.shape({
    message: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Login.defaultProps = {
  error: null,
  isWaiting: false,
  location: {
    message: null,
  },
};

export default Login;

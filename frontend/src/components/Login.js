import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // hasSubmitted is used to make sure messages wont show before the first submition and is not the same as isWaiting
    this.state = { username: '', password: '' };

    this.sendForm = props.sendForm;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    this.setState({ username: '', password: '' });

    this.sendForm(data).then(() => {
      if (this.props.error) {
        this.props.showError(this.props.error);
      } else {
        this.props.showSuccess('Login successful');
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        {
          this.props.location.message ?
            <h3>
              { this.props.location.message }
            </h3> : undefined
        }
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText="Username"
            value={this.state.username}
            onChange={(event, value) => this.setState({ username: value })}
            disabled={this.props.isWaiting}
          /><br />
          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={(event, value) => this.setState({ password: value })}
            disabled={this.props.isWaiting}
          /><br />
          <RaisedButton type="submit" onClick={this.handleSubmit} label="Login" primary />
        </form>
      </div>
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
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: null,
  isWaiting: false,
  location: {
    message: null,
  },
};

export default Login;

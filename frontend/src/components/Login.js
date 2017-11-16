import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
     //hasSubmitted is used to make sure messages wont show before the first submition and is not the same as isWaiting
    this.state = {username: '', password: '', hasSubmitted: false};

    this.sendForm = props.sendForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    }

    this.setState ({hasSubmitted: true});
    this.setState({name: '', password: ''});

    console.log(this.props.sendForm);

    this.props.sendForm(data).then((response) => {
      if (!this.props.error) {
        this.props.history.push('/addRep');
      }
    }); 
  }

  printSubmitMessage(error, hasSubmitted, isWaiting) {
    if (error && !isWaiting && hasSubmitted) {
      return (
        <p>Could not log in. {error} </p>
      )
    } else if (!error && !isWaiting && hasSubmitted) {
      return (
        <Redirect to={{
          pathname: '/addRep',
        }}
        />
      )
    }
  }

  render () {
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
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}/>
          </div>
          <input type="submit" value="Login" />
          { this.props.error && !this.props.isWaiting && this.state.hasSubmitted ? 
              <p> Could not log in. {this.props.error} </p> : undefined }
        </fieldset>
      </form>
    );
  }
}

export default Login;

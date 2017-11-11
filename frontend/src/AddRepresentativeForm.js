import React from 'react';

class AddRepresentativeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    this.setState({name: '', password: ''})
    event.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add representative to company</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            name="name" 
            type="text" 
            value={this.state.name} 
            onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            name="password" 
            type="text"
            value={this.state.password}
            onChange={this.handleChange}/>
        </div>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default AddRepresentativeForm;
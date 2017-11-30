import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class AddMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [], title: '', description: '' };
    this.sendForm = props.sendForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const data = {
      title: this.state.title,
      description: this.state.description,
      files: this.state.files,
    };

    console.log(data);
    
    this.sendForm(data, this.props.match.params.id, this.props.token);
    this.setState({ hasSubmitted: true });
    this.setState({ title: '', description: '', files: [] });
  }

  printSubmitMessage() {
    if (this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Could not upload material. {this.props.error} </p>
      );
    } else if (!this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Material uploaded successfully!</p>
      );
    }

    return undefined;
  }

  render() {
    return (
      <div className="AddMaterial">
        <label htmlFor="title">
              Title:
          <br />
          <input
            id="title"
            name="title"
            type="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor="title">
              Description:
          <br />
          <input
            id="description"
            name="description"
            type="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <section>
          <div className="dropzone">
            <Dropzone accept=".pdf" onDrop={this.onDrop.bind(this)}>
              <p>Drag and drop some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
        { this.state.files[0] ? (<button onClick={this.handleSubmit}>Upload</button>) : (null) }
        {this.printSubmitMessage()}
      </div>
    );
  }
}

AddMaterial.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
};

AddMaterial.defaultProps = {
  error: null,
  isWaiting: false,
  token: null,
};

export default AddMaterial;

import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
        <TextField
          id="title"
          name="title"
          floatingLabelText="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <TextField
          id="description"
          name="description"
          floatingLabelText="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <section>
          <div className="dropzoneContainer">
            <Dropzone
              accept=".pdf"
              onDrop={this.onDrop.bind(this)}
              style={{
                borderColor: '#afafaf',
                borderRadius: '2px',
                borderStyle: 'dashed',
                borderWidth: '2px',
                width: '200px',
                height: '200px',
                padding: '25px',
              }}
            >
              <p>Drag and drop some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <ul>
              {this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
            </ul>
          </aside>
        </section>
        { this.state.files[0] ? (<RaisedButton label="Upload" primary onClick={this.handleSubmit} />) : (null) }
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

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

    this.sendForm(data, this.props.match.params.id, this.props.token).then(() => {
      if (this.props.error) {
        this.props.showError(this.props.error);
      } else {
        this.props.showSuccess('Material added');
      }
    });

    this.setState({ title: '', description: '', files: [] });
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
              multiple={false}
              accept=".pdf"
              onDrop={this.onDrop.bind(this)} // eslint-disable-line
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
              <p>Drag and drop a file here, or click to select file to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <ul>
              {this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
            </ul>
          </aside>
        </section>
        <RaisedButton
          label="Upload"
          primary
          onClick={this.handleSubmit}
          disabled={!(this.state.title !== '' && this.state.files[0])}
        />
      </div>
    );
  }
}

AddMaterial.propTypes = {
  error: PropTypes.string,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

AddMaterial.defaultProps = {
  error: null,
  token: null,
};

export default AddMaterial;

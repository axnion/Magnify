import React from 'react';
import Dropzone from 'react-dropzone';

class AddMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  render() {
    return (
      <div className="AddMaterial">
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
        { this.state.files[0] ? (<button>Upload</button>) : (null) }
      </div>
    );
  }
}

export default AddMaterial;

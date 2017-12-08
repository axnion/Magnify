import { connect } from 'react-redux';
import React from 'react';

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Index">
        <h1>Magnify</h1>
      </div>
    );
  }
}

IndexContainer.propTypes = {
};

IndexContainer.defaultProps = {
};

const mapDispatchToProps = () => ({
});


const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexContainer);

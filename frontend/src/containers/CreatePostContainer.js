import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreatePost from '../components/CreatePost';
import { sendPost } from '../actions/post';
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

class CreatePostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
    };

    this.sendPostOnClick = this.sendPostOnClick.bind(this);
  }

  sendPostOnClick(body, callback) {
    if (body !== '') {
      const data = { body, threadId: this.props.threadId };
      this.props.sendPost(data, this.props.auth.token)
        .then(() => {
          if (this.props.error) {
            this.props.showError(this.props.error);
          } else {
            this.props.showSuccess('Post posted');
            callback();
            this.setState({ errorText: '' });
          }
        });
    } else {
      this.setState({ errorText: 'Post cannot be empty' });
    }
  }

  render() {
    return (
      <CreatePost
        sendPostOnClick={this.sendPostOnClick}
        {...this.state}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendPost: (data, token) => dispatch(sendPost(data, token)),
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  error: state.thread.postError,
  isWaiting: state.thread.isWaiting,
  auth: state.auth,
  threadId: state.thread.currentThread._id,
});

CreatePostContainer.propTypes = ({
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  sendPost: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
});

CreatePostContainer.defaultProps = ({
  error: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostContainer);

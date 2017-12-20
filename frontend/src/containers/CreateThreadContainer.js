import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateThread from '../components/CreateThread';
import { createThread } from '../actions/thread'; 
import { snackbarSuccess, snackbarError } from '../actions/snackbar';

const sendThread = createThread;

class CreateThreadContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
    };

    this.SubmitOnClick = this.SubmitOnClick.bind(this);
  }

  SubmitOnClick(payload, callback) {
    if (payload.title.length > 0 && payload.body.length > 0) {
      this.setState({ snackbarError: false });
      this.props.sendThread(payload, this.props.match.params.id, this.props.auth.token)
        .then(() => {
          if (this.props.error) {
            this.props.showError(this.props.error);
          } else {
            this.props.showSuccess('Thread created');
            callback();
            this.props.history.goBack();
          }
        });
    } else {
      this.setState({ snackbarSuccess: false, snackbarError: true, errorText: 'Thread needs both a title and body!' });
    }
  }

  render() {
    return (
      <CreateThread
        SubmitOnClick={this.SubmitOnClick}
        {...this.state}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendThread: (data, productId, token) => dispatch(sendThread(data, productId, token)),
  showError: message => dispatch(snackbarError(message)),
  showSuccess: message => dispatch(snackbarSuccess(message)),
});

const mapStateToProps = state => ({
  error: state.thread.error,
  isWaiting: state.thread.isWaiting,
  auth: state.auth,
});

CreateThreadContainer.propTypes = ({
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  sendThread: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
});

CreateThreadContainer.defaultProps = ({
  error: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateThreadContainer);

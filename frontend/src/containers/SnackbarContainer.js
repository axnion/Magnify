import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import { resetSnackbar } from '../actions/snackbar';

const SnackbarContainer = ({
  success,
  error,
  message,
  handleRequestClose,
}) => (
  <div className="footer">
    <Snackbar
      open={success}
      message={message}
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
      bodyStyle={{ backgroundColor: '#21ba45' }}
      contentStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
    <Snackbar
      open={error}
      message={message}
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
      contentStyle={{ color: '#fff', fontWeight: 'bold' }}
    />
  </div>
);

SnackbarContainer.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  handleRequestClose: PropTypes.func.isRequired,
};

SnackbarContainer.defaultProps = {
  success: false,
  error: false,
  message: '',
};

const mapDispatchToProps = dispatch => ({
  handleRequestClose: () => dispatch(resetSnackbar()),
});

const mapStateToProps = state => ({
  success: state.snackbar.success,
  error: state.snackbar.error,
  message: state.snackbar.message,
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarContainer);

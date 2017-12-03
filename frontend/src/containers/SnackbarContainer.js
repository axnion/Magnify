import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class SnackbarContainer extends React.Component {
  render() {
    const { loginSuccess, registerSuccess } = this.props;
    return (
      <div>
        <Snackbar
          open={loginSuccess}
          message="Successfully logged in"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: '#21ba45' }}
          contentStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
        <Snackbar
          open={registerSuccess}
          message="Successfully logged in"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{ backgroundColor: '#21ba45' }}
          contentStyle={{ color: '#fff', fontWeight: 'bold' }}
        />
      </div>
    );
  }
}

SnackbarContainer.propTypes = {
  loginSuccess: PropTypes.bool,
  registerSuccess: PropTypes.bool,
};

SnackbarContainer.defaultProps = {
  loginSuccess: false,
  registerSuccess: false,
};

const mapStateToProps = state => ({
  loginSuccess: !!state.auth.username,
  registerSuccess: false,
});

export default connect(
  mapStateToProps,
)(SnackbarContainer);

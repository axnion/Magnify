import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../components/Search';
import { setThreadFilter, clearThreadFilter } from '../actions/thread'; // change here to use non mock action

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
  }

  componentWillUnmount() {
    this.props.clearThreadFilter();
  }

  doSearch(body, callback) {
    this.props.setThreadFilter(body);
    callback();
  }

  render() {
    return (
      <Search
        search={this.doSearch}
        filterBy={this.props.filterBy}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setThreadFilter: data => dispatch(setThreadFilter(data)),
  clearThreadFilter: () => dispatch(clearThreadFilter()),
});

const mapStateToProps = state => ({
  filterBy: state.thread.filterBy,
});

SearchContainer.propTypes = ({
  setThreadFilter: PropTypes.func.isRequired,
  clearThreadFilter: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import SearchContainer from '../containers/SearchContainer';
import ThreadList from '../components/thread/ThreadList';

const Forum = ({
  threads,
  username,
  isWaiting,
}) => (
  <div>
    <h1>Forum</h1>
    {
    username === null ? undefined : <Link to="/createThread"><RaisedButton label="Create new thread" primary /></Link>
    }
    <SearchContainer style={{ display: 'inline-block' }} />
    <ThreadList
      threads={threads}
      isWaiting={isWaiting}
    />
  </div>
);

Forum.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.any,
    createdAt: PropTypes.string,
  })),
  username: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
});

Forum.defaultProps = ({
  threads: [],
  username: null,
});

export default Forum;

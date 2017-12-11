import React from 'react';
import styled from 'styled-components';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import ThreadHead from './thread/ThreadHead';

const style = {
  margin: '20px'
}

const Forum = ({
  threads,
}) => (
  <div>
    <h1>Forum</h1>
    <Link to="/createThread"><RaisedButton label="Create new thread" primary /></Link>
    <List>
      {
      threads.length <= 0 ?
      <CircularProgress /> :
        threads.map(thread => (
          // TODO: replace with link to correct thread ID
          <Link to={`/threadView`}>
            <ThreadHead
              customStyle={style}
              key={thread._id}
              title={thread.title}
              author={thread.author}
              createdAt={thread.createdAt}
            />
          </Link>
        ))
      }
    </List>
  </div>
);

Forum.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.any,
    createdAt: PropTypes.string,
  })),
});

Forum.defaultProps = ({
  threads: [],
});

export default Forum;

import React from 'react';
import List from 'material-ui/List';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import ThreadHead from './thread/ThreadHead';

const style = {
  margin: '20px',
};

const StyledList = styled(List)`
  max-height: 520px;
  overflow-y: auto;
`;

const Forum = ({
  threads,
  username,
}) => (
  <div>
    <h1>Forum</h1>
    {
     username === null ? undefined : <Link to="/createThread"><RaisedButton label="Create new thread" primary /></Link>
    }
    <StyledList>
      {
      threads.length <= 0 ?
        <CircularProgress /> :
        threads.map(thread => (
          <Link to={`/thread/${thread._id}`} key={thread._id}>
            <ThreadHead
              customStyle={style}
              title={thread.title}
              author={thread.author}
              createdAt={thread.createdAt}
            />
          </Link>
        ))
      }
    </StyledList>
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
});

Forum.defaultProps = ({
  threads: [],
  username: null,
});

export default Forum;

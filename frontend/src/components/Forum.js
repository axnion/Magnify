import React from 'react';
import styled from 'styled-components';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ThreadHead from './thread/ThreadHead';

const ForumList = styled(List)`
  > a:first-child > div {
    border-top: 2px solid black;
  }
`;

const Forum = ({
  threads,
}) => (
  <div>
    <h1>Forum</h1>
    <ForumList>
      {
        threads.map(thread => (
          // TODO: replace with link to correct thread ID
          <Link to={`/threadView`}>
            <ThreadHead
              key={thread._id}
              title={thread.title}
              author={thread.author}
              createdAt={thread.createdAt}
            />
          </Link>
        ))
      }
    </ForumList>
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

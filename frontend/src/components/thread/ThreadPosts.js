import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import ThreadPost from './ThreadPost';

const StyledDiv = styled('div')`
  max-height: 430px;
  overflow-y: auto;
  padding-left: 0px;
  margin-left: -10px;
`;

const ThreadPosts = ({ posts }) => {
  let toReturn = null;

  if (posts.length > 0) {
    toReturn = (
      <StyledDiv>
        {posts.map(post => (
          <ThreadPost
            key={post._id}
            body={post.body}
            author={post.author}
            createdAt={post.createdAt}
          />
        ))
        }
      </StyledDiv>
    );
  }
  return toReturn;
};

ThreadPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      role: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    createdAt: PropTypes.string,
  })),
};

ThreadPosts.defaultProps = {
  posts: [],
};

export default ThreadPosts;

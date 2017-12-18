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

const ThreadPosts = ({ posts, product }) => {
  let toReturn = null;

  const postSet = new Set();

  posts.forEach((post) => {
    if (post.author.company && product && post.author.company._id === product.company._id) {
      postSet.add(post);
    }
  });

  posts.forEach((post) => {
    postSet.add(post);
  });

  const postArray = Array.from(postSet);

  if (posts.length > 0) {
    toReturn = (
      <StyledDiv>
        {postArray.map(post => (
          <ThreadPost
            key={post._id}
            body={post.body}
            author={post.author}
            createdAt={post.createdAt}
            marked={post.author.company && product && post.author.company._id === product.company._id}
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
    product: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
      company: PropTypes.shape({
        _id: PropTypes.string,
      }),
    }),
    createdAt: PropTypes.string,
  })),
};

ThreadPosts.defaultProps = {
  posts: [],
};

export default ThreadPosts;

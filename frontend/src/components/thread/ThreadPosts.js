import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Material-ui
import List from 'material-ui/List';
import ThreadPost from './ThreadPost';

const StyledDiv = styled('div')`
max-height: 480px;
overflow: auto;
`;

const ThreadPosts = ({ posts }) => {
  let toReturn = null;

  if (posts.length > 0) {
    toReturn = (
      <StyledDiv>
        <List style={{ maxHeight: '100%', overFlow: 'auto', marginTop: '-5px' }} >
          {posts.map(post => (
            <ThreadPost
              key={post._id}
              body={post.body}
              author={post.author}
              createdAt={post.createdAt}
            />
        ))
        }
        </List>
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
      roel: PropTypes.string,
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

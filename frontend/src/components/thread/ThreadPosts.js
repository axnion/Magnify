import React from 'react';
import PropTypes from 'prop-types';

// Material-ui
import Divider from 'material-ui/Divider';

import ThreadPost from './ThreadPost';

const ThreadPosts = ({ posts }) => {
  let toReturn = null;

  if (posts.length > 0) {
    toReturn = (
      <div>
        {posts.map(post => (
          <ThreadPost
            key={post._id}
            body={post.body}
            author={post.author}
            createdAt={post.createdAt}
          />
        ))
        }
      </div>
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

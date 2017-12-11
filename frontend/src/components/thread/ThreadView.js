import React from 'react';
import PropTypes from 'prop-types';

import ThreadHead from './ThreadHead';
import ThreadPosts from './ThreadPosts';
import CreatePostContainer from '../../containers/CreatePostContainer';

const ThreadView = (props) => {
  const {
    thread,
  } = props;
  return thread ? (
    <div>
      <ThreadHead
        title={thread.title}
        body={thread.body}
        author={thread.author}
        createdAt={thread.createdAt}
      />
      <ThreadPosts posts={thread.posts} />
      <CreatePostContainer />
    </div>
  ) : null;
};

ThreadView.propTypes = {
  thread: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.shape({
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
    author: PropTypes.shape({
      username: PropTypes.string,
      roel: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    createdAt: PropTypes.string,
  }),
};

ThreadView.defaultProps = {
  thread: null,
};


export default ThreadView;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CircularProgress from 'material-ui/CircularProgress';
import List from 'material-ui/List';

import ThreadHead from '../thread/ThreadHead';


const style = {
  marginBottom: '10px',
  marginRight: '10px',
};

const StyledList = styled(List)`
  max-height: 520px;
  overflow-y: auto;
`;

const ThreadList = ({
  threads,
  isWaiting,
}) => (
  <div>
    <StyledList>
      {
      threads.length <= 0 && isWaiting ?
        <CircularProgress /> :
        threads.map(thread => (
          <Link to={`/thread/${thread._id}`} key={thread._id}>
            <ThreadHead
              customStyle={style}
              title={thread.title}
              author={thread.author}
              createdAt={thread.createdAt}
              product={thread.product}
            />
          </Link>
        ))
      }
    </StyledList>
  </div>
);

ThreadList.propTypes = ({
  threads: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.any,
    createdAt: PropTypes.string,
    product: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  })),
  isWaiting: PropTypes.bool.isRequired,
});

ThreadList.defaultProps = ({
  threads: [],
});

export default ThreadList;

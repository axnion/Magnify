import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import StarRating from '../components/StarRating';

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rating: 3};
    this.onClick = props.onClick;
  }

  render() {
    return (
      <div className="Index">
        <h1>Magnify</h1>
        {StarRating(this.props)}
      </div>
    );
  }
}

IndexContainer.propTypes = {
  onClick: PropTypes.func,
  rating: PropTypes.number,
}

IndexContainer.defaultProps = {
  rating: 3,
}


const mapDispatchToProps = dispatch => ({
  onClick: (number) => {
    console.log('you pressed '+ number);
    dispatch(testAction(number))
  },
});


function testAction(payload) {
  return {
    type: "TEST",
    payload,
   }
}

const mapStateToProps = state => ({
  rating: state.test.rating,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexContainer);

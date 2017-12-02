export default (state = {
    rating: 0,
  }, action) => {
    switch(action.type) {
      case "TEST":
        console.log(action.payload);
        return {
          ...state,
          rating: action.payload,
        };
      default:
        return state;
    }
  };
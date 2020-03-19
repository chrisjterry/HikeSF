import {
  RECEIVE_REVIEWS,
  // RECEIVE_REVIEW,
  // RECEIVE_NEW_REVIEW
} from "../actions/review_actions";

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_REVIEWS:
      newState = action.reviews;
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;


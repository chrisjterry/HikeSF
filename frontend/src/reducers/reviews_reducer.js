import {
  RECEIVE_REVIEWS,
  RECEIVE_REVIEW,
  RECEIVE_NEW_REVIEW
} from "../actions/review_actions";

const ReviewsReducer = (state = { all: [], current: {} }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_REVIEWS:
      newState.all = action.reviews.data;
      return newState;
    case RECEIVE_REVIEW:
      newState.current = action.review.data;
      return newState;
    case RECEIVE_NEW_REVIEW:
      newState.all.push(action.review.data);
      newState.current = action.review.data;
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;


import {
  RECEIVE_REVIEWS,
  // RECEIVE_REVIEW,
  RECEIVE_NEW_REVIEW
} from "../actions/review_actions";

import { merge } from "lodash";

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_REVIEWS:
      // return Object.assign(action.reviews);
      newState = action.reviews;
      return newState;
    case RECEIVE_NEW_REVIEW:
      return merge({}, state, action.review);
    default:
      return state;
  }
};

export default ReviewsReducer;


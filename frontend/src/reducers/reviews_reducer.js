import {
  RECEIVE_REVIEWS,
  // RECEIVE_REVIEW,
  RECEIVE_NEW_REVIEW
} from "../actions/review_actions";

import { merge } from "lodash";

const ReviewsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews.data;
    case RECEIVE_NEW_REVIEW:
      let newState = state.slice();
      newState.push(action.review.data)
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;


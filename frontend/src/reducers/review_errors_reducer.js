import {
    RECEIVE_REVIEW_ERRORS,
    RECEIVE_REVIEWS,
    RECEIVE_NEW_REVIEW,
    RECEIVE_REVIEW
  } from "../../src/actions/review_actions";
  
  const _nullErrors = [];
  
  const ReviewErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_REVIEW_ERRORS:
        return action.errors.response.data;
      case RECEIVE_REVIEWS:
        return _nullErrors;
    case RECEIVE_REVIEW:
        return _nullErrors;
    case RECEIVE_NEW_REVIEW:
        return _nullErrors; 
      default:
        return state;
    }
};
  
export default ReviewErrorsReducer;
  
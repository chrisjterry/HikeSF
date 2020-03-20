import * as ReviewAPIUtil from "../util/review_api_util";

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_NEW_REVIEW = "RECEIVE_NEW_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
});

// const receiveReview = review => ({
//   type: RECEIVE_REVIEW,
//   review
// });

const receiveNewReview = review => ({
  type: RECEIVE_NEW_REVIEW,
  review
});

const receiveReviewErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors
});

export const fetchUserReviews = userId => dispatch =>
  ReviewAPIUtil.fetchAllUserReviews(userId).then(
    reviews => dispatch(receiveReviews(reviews)),
    errors => dispatch(receiveReviewErrors(errors))
  );
  
export const fetchTrailReviews = trailId => dispatch =>
  ReviewAPIUtil.fetchAllTrailReviews(trailId).then(
    reviews => dispatch(receiveReviews(reviews)),
    errors => dispatch(receiveReviewErrors(errors))
  );

// export const fetchReview = id => dispatch =>
//   ReviewAPIUtil.fetchOneReview(id).then(
//     review => dispatch(receiveReview(review)),
//     errors => dispatch(receiveReviewErrors(errors))
//   );

export const createReview = data => dispatch =>
  ReviewAPIUtil.createNewReview(data).then(
    review => dispatch(receiveNewReview(review)),
    errors => dispatch(receiveReviewErrors(errors))
  );

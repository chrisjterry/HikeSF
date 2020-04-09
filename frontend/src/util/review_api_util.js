import axios from "axios";

export const fetchAllUserReviews =  userId => {
  return axios.get(`/api/reviews/user/${userId}`);
};
export const fetchAllTrailReviews = trail_id => {
  return axios.get(`/api/reviews/trail/${trail_id}`);
};

export const createNewReview = data => {
//   debugger;
  return axios.post("/api/reviews", data);
};

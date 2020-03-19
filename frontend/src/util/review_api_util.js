import axios from "axios";

export const fetchAllUserReviews =  user_id => {
  return axios.get(`/api/reviews/user/${user_id}`);
};
export const fetchAllTrailReviews = trail_id => {
  return axios.get(`/api/reviews/trail/${trail_id}`);
};

export const createNewReview = data => {
//   debugger;
  return axios.post("/api/reviews", data);
};

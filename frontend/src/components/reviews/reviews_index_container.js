import ReviewsIndex from "./reviews_index";
import { fetchTrailReviews } from "../../actions/review_actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  reviews: state.entities.reviews.all,
  currentTrail: state.entities.trail.current
});

const mapDispatchToProps = dispatch => ({
  fetchTrailReviews: (trailId) => dispatch(fetchTrailReviews(trailId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsIndex);

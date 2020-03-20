import Stars from "./stars";
import { fetchTrailReviews } from "../../actions/review_actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  reviews: state.entities.reviews,
//   currentTrail: state.entities.trails.current
});

const mapDispatchToProps = dispatch => ({
  fetchTrailReviews: trailId => dispatch(fetchTrailReviews(trailId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stars);

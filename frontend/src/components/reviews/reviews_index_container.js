import ReviewsIndex from "./reviews_index";
import { fetchReviews } from "../../actions/review_actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  reviews: state.entities.reviews.all,
});

const mapDispatchToProps = dispatch => ({
  fetchReviews: () => dispatch(fetchReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsIndex);

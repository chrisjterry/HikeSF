import { connect } from "react-redux";
import { createReview } from "../../actions/review_actions";
import NewReviewForm from "./new_review_form";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    currentTrail: state.entities.trails.current
    // errors: state.errors.reviewErrors
  };
};

const mapDispatchToProps = dispatch => {
  // debugger
  return {
    createReview: review => dispatch(createReview(review))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReviewForm);

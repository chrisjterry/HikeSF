import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state, ownProps) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.sessionErrors,
    redirect: new URLSearchParams(ownProps.location.search).get('redirect')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

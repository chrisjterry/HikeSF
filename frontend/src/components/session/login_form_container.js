import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.sessionErrors,
    redirect: new URLSearchParams(ownProps.location.search).get('redirect')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

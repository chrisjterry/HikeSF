import React from "react";
import { withRouter } from "react-router-dom";
import '../../stylesheets/sign_up_form.css'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    // this.props.signup(user, this.props.history);
    // this.props.login(user);

    this.props.signup(user).then((e) => {
      if (this.props.errors.length === 0) {
        this.props.history.push("/");
      }
    });
  }

  renderErrors() {
    return (
      <ul className='signup-errors'>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="sign-up-form-container">
            <div className='sign-up-text'>
              Please Sign Up
            </div>
            <div className='sign-up-email'>
              <input className='sign-up-email-input' type="text" value={this.state.email} onChange={this.update("email")} placeholder="Email"/>
            </div>
            <div className='sign-up-password'>
              <input className='sign-up-password-input' type="password" value={this.state.password} onChange={this.update("password")} placeholder="Password"/>
            </div>
            <div className='confirm-password'>
              <input className='confirm-password-input' type="password" value={this.state.password2} onChange={this.update("password2")} placeholder="Confirm Password"/>
            </div>
            <div className='sign-up-submit'>
              <input className='sign-up-submit-button' type="submit" value="Submit" />
              {this.renderErrors()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);

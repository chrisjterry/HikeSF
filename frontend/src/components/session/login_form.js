import React from "react";
import { withRouter } from "react-router-dom";
import '../../stylesheets/login_form.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/home");
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
      password: this.state.password
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='login-in-container-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <div className='email-password-container'>
            <div className='sign-in-text'>
              Please Sign In
            </div>
            <div className='email'>
              <input className='email-input' type="text" value={this.state.email} onChange={this.update("email")} placeholder="Email"/>
            </div>
            <div className='password'>
              <input className='password-input' type="password" value={this.state.password} onChange={this.update("password")} placeholder="Password"/>
            </div>
            <div className='submit-button-container'>
              <input className='sumbit-button' type="submit" value="Sign In" />
              {this.renderErrors()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);

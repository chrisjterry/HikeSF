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
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user, this.props.history).then(() => {
      if (this.props.signedIn === true)
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        }).then(() => {
          if (this.props.redirect) this.props.history.push(this.props.redirect);
        });
    });
  }

  handleDemo(e, speed = 110) {
    e.preventDefault();
    const user = { email: "jeff@gmail.com", password: "password" };
    let { email, password } = user;
    if (this.state.email !== email) {
      const inputUser = setInterval(() => {
        if (this.state.email !== email) {
          const temp = email.slice(0, this.state.email.length + 1);
          this.setState({ email: temp });
        } else {
          clearInterval(inputUser);
          animatePassword();
        }
      }, speed);
    }

    const animatePassword = () => {
      const inputPassword = setInterval(() => {
        if (this.state.password !== password)
          this.setState({
            password: password.slice(0, this.state.password.length + 1),
          });
        else {
          clearInterval(inputPassword);
          login();
        }
      }, speed);
    };
    const login = () => {
      this.props.login(this.state).then(() => {
        this.setState({ username: "", password: "" });
        if (this.props.redirect) this.props.history.push(this.props.redirect);
      });
    };
  }

  renderErrors() {
    return (
      <ul className="signup-errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }
  // renderErrors() {
  //   return (
  //     <ul className='signup-errors'>
  //       {Object.keys(this.errors).map((error, i) => (
  //         <li key={`error-${i}`}>{error}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    // debugger
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="sign-up-form-container">
            <div className="sign-up-text">Please Sign Up</div>
            <div className="sign-up-email">
              <input
                className="sign-up-email-input"
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
            </div>
            <div className="sign-up-password">
              <input
                className="sign-up-password-input"
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            </div>
            <div className="confirm-password">
              <input
                className="confirm-password-input"
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
              />
            </div>
            <div className="sign-up-submit">
              <input
                className="sign-up-submit-button"
                type="submit"
                value="Sign Up!"
              />
              {this.renderErrors()}
            </div>
            <div className="demo-user" onClick={this.handleDemo}>
              Demo User
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);

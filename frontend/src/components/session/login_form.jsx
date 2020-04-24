import React from "react";
import { withRouter } from "react-router-dom";
import '../../stylesheets/login_form.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/home");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user).then(() => {
      if (this.props.redirect) this.props.history.push(this.props.redirect);
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
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-in-container-wrapper">
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="email-password-container">
              <div className="sign-in-text">Please Sign In</div>
              <div className="email">
                <input
                  className="email-input"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>
              <div className="password">
                <input
                  className="password-input"
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                />
              </div>
              <div className="submit-button-container">
                <input
                  className="sumbit-button"
                  type="submit"
                  value="Sign In"
                />
                {this.renderErrors()}
              </div>
              <div className='demo-user' onClick={this.handleDemo}>
                Demo User
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);

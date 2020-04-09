import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/nav.css";
import logo from "./logo.png";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }
  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav">
          {/* <div className="logged-in-home-page-container"> */}
          {/* <div className="left-side-logged-in-container">
          </div> */}
          <div className="left-nav">
            <a href="https://github.com/chrisjterry/HikeSF">
              <i className="fab fa-github-alt"></i>
            </a>
            <Link className="nav-link" to={"/trails"}>
              View Trails
            </Link>
            <Link className="nav-link" to={"/trails/new"}>
              Create a Trail
            </Link>
          </div>
          <div className="nav-bar-logo">
            <Link to="/">
              <img className="nav-logo" src={logo} alt="" />
            </Link>
          </div>
          <div className="right-nav">
            {/* <div> */}
            <Link className="nav-link" to={"/profile"}>
              Profile
            </Link>
            {/* </div> */}
            {/* <div className="logout-button"> */}
            <Link className="nav-link" to="/" onClick={this.logoutUser}>
              Log out
            </Link>
            {/* </div> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav">
          {/* <div className="github-icon"> */}
            <a href="https://github.com/chrisjterry/HikeSF">
              <i className="fab fa-github-alt"></i>
            </a>
          {/* </div> */}
          <div className="nav-bar-logo">
            <Link to="/">
              <img className="nav-logo " src={logo} alt="" />
            </Link>
          </div>
          <div className="right-nav">
            {/* <div className="signup"> */}
              <Link className="nav-link" to={"/register"}>
                Sign up
              </Link>
            {/* </div> */}
            {/* <div className="login"> */}
              <Link className="nav-link" to={"/login"}>
                Log in
              </Link>
            {/* </div> */}
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.getLinks()}
      </div>
    );
  }
}
export default NavBar;

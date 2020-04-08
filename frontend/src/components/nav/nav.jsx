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
        <div className="logged-in-home-page-container">
          <div className="left-side-logged-in-container">
            <div className="trails-link">
              <Link className="all-trails" to={"/trails"}>
                All Trails
              </Link>
            </div>
            {/* <div className="create-trail-wrap">
              <Link className="create-trail" to={"/trails/new"}>
                Create New Trail
              </Link>
            </div> */}
          </div>
          <div className="nav-bar-logo">
            <Link to="/">
              <img className="nav-logo " src={logo} alt="" />
            </Link>
          </div>
          <div className="right-side-nav-logged-in-container">
            <div className="profile-link">
              <Link className="profile" to={"/profile"}>
                Profile
              </Link>
            </div>
            <div className="logout-button">
              <Link className="log-out" to="/" onClick={this.logoutUser}>
                Log out
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-bar-container">
          {/* <div className="left-side-nav-bar">
            <h3>HikeSF</h3>
          </div> */}
          <div className="nav-bar-logo">
            <Link to="/">
              <img className="nav-logo " src={logo} alt="" />
            </Link>
          </div>
          <div className="right-side-nav-bar">
            <div className="signup">
              <Link className="signup-link" to={"/register"}>
                Sign up
              </Link>
            </div>
            <div className="login">
              <Link className="login-link" to={"/login"}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {/* <h1>This is HikeSF</h1> */}
        {this.getLinks()}
      </div>
    );
  }
}
export default NavBar;

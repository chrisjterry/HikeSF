import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/nav.css";
import logo from "./logo.png";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: new URLSearchParams(this.props.location.search).get('redirect')
    }
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  componentDidUpdate() {
    const redirect = new URLSearchParams(this.props.location.search).get('redirect');
    if (redirect && !this.state.redirect) this.setState({ redirect })
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
              Your Trails
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
          <div className='left-nav'>
            <a href="https://github.com/chrisjterry/HikeSF">
              <i className="fab fa-github-alt"></i>
            </a>
          </div>
          {/* </div> */}
          <div className="nav-bar-logo">
            <Link to="/">
              <img className="nav-logo " src={logo} alt="" />
            </Link>
          </div>
          <div className="right-nav">
            {/* <div className="signup"> */}
              <Link className="nav-link" to={`/register${this.state.redirect ? `?redirect=${this.state.redirect}` : ''}`}>
                Sign up
              </Link>
            {/* </div> */}
            {/* <div className="login"> */}
              <Link className="nav-link" to={`/login${this.state.redirect ? `?redirect=${this.state.redirect}` : ''}`}>
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

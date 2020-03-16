import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ currentUser, logout }) => {
    const loggedOutNav = () => (
        <nav className="login-signup">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
        </nav>
    );
    const loggedInNav = () => (
        <hgroup className="header-group">
            <h2 className="header-name">Ready to hike, {currentUser.email}?</h2>
            <button className="header-button" onClick={logout}>Logout</button>
        </hgroup>
    );

    return currentUser ? loggedInNav() : loggedOutNav();
};


export default Nav;

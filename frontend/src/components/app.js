import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Link } from "react-router-dom";

import MainPage from "./main/main_page";
import NavContainer from "./nav/nav_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import TrailsIndexContainer from "./trails/trails_index_container";
import TrailShowContainer from "./trails/trail_show_container";
import NewTrailContainer from "./trails/new_trail_form_container";


const App = () => (
  <div>
    <NavContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />

      <ProtectedRoute exact path="/trails" component={TrailsIndexContainer} />
      <ProtectedRoute exact path="/trails/new" component={NewTrailContainer} />
      <ProtectedRoute exact path="/trails/:id" component={TrailShowContainer} />
    </Switch>
    <footer className='footer'>
      temporary footer
      {/* <Link to="https://github.com/chrisjterry/HikeSF">
        <i className="fab fa-github-alt"></i>
      </Link> */}
    </footer>
  </div>
);

export default App;

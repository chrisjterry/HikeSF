import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import MainPage from "./main/main_page";
import NavContainer from "./nav/nav_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import TrailsIndexContainer from "./trails/trails_index_container";
import TrailShowContainer from "./trails/trail_show_container";


const App = () => (
  <div>
    <NavContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <ProtectedRoute exact path="/trails" component={TrailsIndexContainer} />
      <ProtectedRoute exact path="/trails/:id" component={TrailShowContainer} />
    </Switch>
    <footer>Copyright 2020</footer>
  </div>
);

export default App;

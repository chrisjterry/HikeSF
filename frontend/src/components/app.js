import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route, Switch, Link } from "react-router-dom";

import MainPageContainer from "./main/main_page_container";
import NavContainer from "./nav/nav_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import TrailsIndexContainer from "./trails/trails_index_container";
import TrailShowContainer from "./trails/trail_show_container";
import NewTrailContainer from "./trails/new_trail_form_container";
import '../stylesheets/footer.css'


const App = () => (
  <div>
    <NavContainer />
    {/* <MainPageContainer /> */}
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />

      <ProtectedRoute exact path="/trails" component={TrailsIndexContainer} />
      <ProtectedRoute exact path="/trails/new" component={NewTrailContainer} />
      <ProtectedRoute exact path="/trails/:id" component={TrailShowContainer} />
      <Route path="/" component={MainPageContainer} />
    </Switch>
    <footer className="footer">
      Thank you for visiting HikeSF! Check out our GitHub repository 
      <Link to="https://github.com/chrisjterry/HikeSF"> 👥</Link>
    </footer>
  </div>
);

export default App;

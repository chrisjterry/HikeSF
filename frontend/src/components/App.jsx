import React from "react";
import NavContainer from './nav/nav_container';
import LoginFormContainer from './session_form/login_form_container';
import LoginFormContainer from './session_form/signup_form_container';

const App = () => (
    <div>
        <header>
            <h1>HikeSF</h1>
            <NavContainer />
        </header>

        <Route path="/login" component={LoginFormContainer} />
        <Route path="/signup" component={SignupFormContainer} />
    </div>
);

export default App;
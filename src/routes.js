import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
import AuthWizard from './Components/Auth/AuthWizard/AuthWizard';
import Feed from './Components/Feed/Feed';
import Profile from "./Components/Account/Profile/Profile";

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={AuthWizard} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/account/:username" component={Profile} />
        </Switch>
    </BrowserRouter>
);
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
import LandingPage from "./Components/LandingPage/LandingPage";

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LandingPage} />
        </Switch>
    </BrowserRouter>
);
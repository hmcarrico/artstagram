import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Components
import AuthWizard from './Components/Auth/AuthWizard/AuthWizard';

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={AuthWizard} />
        </Switch>
    </BrowserRouter>
);
import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
import AuthWizard from './Components/Auth/AuthWizard/AuthWizard';
import Feed from './Components/Feed/Feed';
import Profile from "./Components/Account/Profile/Profile";
import DetailedPost from './Components/Account/DetailedPost/DetailedPost';
import PostWizard from './Components/Posts/PostWizard/PostWizard';

export default (
    <Switch>
        <Route exact path="/" component={AuthWizard} />
        <Route path="/post/:postId" component={DetailedPost}/>
        <Route path="/feed" component={Feed} />
        <Route path="/newpost" component={PostWizard} />
        <Route path="/account/:username" component={Profile} />
    </Switch>
);
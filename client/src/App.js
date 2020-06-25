import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Router } from "react-router-dom";
import { history } from "./helpers/history";

import { PrivateRoute } from "./components/Private-Route.Component";

import HomeFeed from "./components/home-feed.component";
import UserFeed from "./components/user-feed.component";
import ForumFeed from "./components/forum-feed.component";
import CreatePost from "./components/submit-post.component";
import NavbarComp from "./components/navbar.component";
import LogIn from "./components/log-in.component";
import SignUp from "./components/sign-up.component";
import Post from "./components/post.component";
import CreateForum from "./components/create-forum.component";
import CreateComment from "./components/create-comment.component";
import EditForum from "./components/edit-forum.component";
import EditComment from "./components/edit-comment.component";
import EditPost from "./components/edit-post.component";
import Search from "./components/search.component";
import ChangePassword from "./components/change-password.component";
class App extends Component {
  render() {
    // todo search
    return (
      <Router history={history}>
        <div className="container">
          <NavbarComp isLoggedIn={true} />
          <br />
          <Route path="/" exact component={HomeFeed} />
          <Route path="/user/:name" exact component={UserFeed} />
          <Route path="/forum/:name" exact component={ForumFeed} />
          <Route path="/post/:id" exact component={Post} />
          <PrivateRoute path="/create/post" exact component={CreatePost} />
          <PrivateRoute path="/create/forum" exact component={CreateForum} />
          <PrivateRoute
            path="/create/comment/:id"
            exact
            component={CreateComment}
          />
          <PrivateRoute path="/edit/post/:id" exact component={EditPost} />
          <PrivateRoute path="/edit/forum/:name" exact component={EditForum} />
          <PrivateRoute
            path="/edit/comment/:id"
            exact
            component={EditComment}
          />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/search/:searchterm" exact component={Search} />
          <Route path="/change/password" exact component={ChangePassword} />
        </div>
      </Router>
    );
  }
}

export default App;

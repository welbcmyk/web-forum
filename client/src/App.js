import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomeFeed from "./components/home-feed.component";
import UserFeed from "./components/user-feed.component";
import ForumFeed from "./components/forum-feed.component";
import Submit from "./components/submit-post.component";
import NavbarComp from "./components/navbar.component";
import PrivateRoute from "./components/Private-Route.Component";
import LogIn from "./components/log-in.component";
import SignUp from "./components/sign-up.component";
import {history} from "./helpers/history";

class App extends Component {
  render() { // todo search
    return (
      <Router history={history}>
        <div className="container">
          <NavbarComp isLoggedIn={true}/>
          <br />
          <Route path="/" exact component={HomeFeed} />
          <Route path="/user/:name" exact component={UserFeed} />
          <Route path="/forum/:name" exact component={ForumFeed} />
          {/*<Route path="/post/:id" exact component={}/>
          <Route path="/create/post" exact component={Submit} />
          <Route path="/create/forum" exact component={}/>
          <Route path="/create/comment" exact component={}/>
          <PrivateRoute path="/edit/post/:id" exact component={Submit} />
          <PrivateRoute path="/edit/forum/:name" exact component={}/>
          <PrivateRoute path="/edit/comment/:id" exact component={}/>*/}
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/login" exact component={LogIn}/>
        </div>
      </Router>
    );
  }
}

export default App;

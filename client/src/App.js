import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomeFeed from "./components/home-feed.component";
import UserFeed from "./components/user-feed.component";
import ForumFeed from "./components/forum-feed.component";
import Submit from "./components/submit.component";
import Navbar from "./components/navbar.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={HomeFeed} />
          <Route path="/user/:username" exact component={UserFeed} />
          <Route path="/forum/:forumname" exact component={ForumFeed} />
          <Route path="/forum/:forumname/submit" exact component={Submit} />
          <Route path="/submit" exact component={Submit} />
        </div>
      </Router>
    );
  }
}

export default App;

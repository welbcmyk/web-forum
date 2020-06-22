import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomeFeed from "./components/home-feed.component";
import UserFeed from "./components/user-feed.component";
import ForumFeed from "./components/forum-feed.component";
import Submit from "./components/submit-post.component";
import NavbarComp from "./components/navbar.component";

class App extends Component {
  render() { // todo search
    return (
      <Router>
        <div className="container">
          <NavbarComp isLoggedIn={true}/>
          <br />
          <Route path="/" exact component={HomeFeed} />
          <Route path="/user/:name" exact component={UserFeed} />
          <Route path="/forum/:name" exact component={ForumFeed} />
          <Route path="/submit" exact component={Submit} />
          <Route path="/forum/submit/:name" exact component={Submit} />
        </div>
      </Router>
    );
  }
}

export default App;

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomeFeed from "./components/home-feed.component";
import UserFeed from "./components/user-feed.component";
import ForumFeed from "./components/forum-feed.component";
import Submit from "./components/submit.component";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Forum-Web</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">HomeFeed</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/submit" className="nav-link">Create Post</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/user/userfoo" className="nav-link">Get to user</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/forum/forumfoo" className="nav-link">Get to Forum</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
        <Route path="/" exact component={HomeFeed} />
        <Route path="/user/:username" component={UserFeed} />
        <Route path="/forum/:forumname" component={ForumFeed} />
        <Route path="/forum/:forumname/submit" component={Submit} />
        <Route path="/submit" component={Submit} />
        </div>
      </Router>
    );
  }
}

export default App;

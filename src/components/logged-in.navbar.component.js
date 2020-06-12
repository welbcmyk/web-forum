import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class LoggedInNavbar extends Component {
  render() {
    return (
      // TODO add routes
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/submit" className="nav-link">
            Create Post
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="nav-link">
            Profil
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="nav-link">
            Settings
          </Link>
        </li>
      </ul>
    );
  }
}

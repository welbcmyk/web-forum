import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

export default class LoggedOutNavbar extends Component {
  render() {
    return (
      // TODO add routes
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/" className="nav-link">
            Log In
          </Link>
        </li>
        <li className="navbar-item border rounded">
          <Link to="/" className="nav-link">
            Sign Up
          </Link>
        </li>
      </ul>
    );
  }
}

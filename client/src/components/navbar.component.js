import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoggedInNavbar from "./logged-in.navbar.component";
import LoggedOutNavbar from "./logged-out.navbar.component";
import SearchBar from "./search-bar.component";

import logo from "../images/logo1.png";

export default class Navbar extends Component {
  render() {
    return (
      // TODO add log in check variable
      // TODO add props to searchbar
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" class="navbar-brand">
          <img
            class="rounded"
            src={logo}
            width="30"
            height="30"
            alt="Forum-App Logo"
          />
        </Link>
        <Link to="/" className="navbar-brand">
          Forum-Web
        </Link>
        <div className="collapse navbar-collapse">
          {true ? <LoggedInNavbar /> : <LoggedOutNavbar />}
        </div>
        <SearchBar/>
      </nav>
    );
  }
}

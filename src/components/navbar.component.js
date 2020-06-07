import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoggedInNavbar from "./logged-in.navbar.component";
import LoggedOutNavbar from "./logged-out.navbar.component";

import logo from "../logo.svg";


export default class Navbar extends Component {
    render() {
        return ( // TODO add log in chack variable
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
                    <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
                </a>
                <Link to="/" className="navbar-brand">Forum-Web</Link>
                <div className="collpase navbar-collapse">
                </div>
                {true ? <LoggedInNavbar /> : <LoggedOutNavbar />}
            </nav>
        )
    }
}